import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, sanitize } from "@/lib/rate-limit";

/**
 * GoHighLevel (GHL) Lead Capture Webhook
 *
 * Receives lead data from the /join multi-step form and forwards
 * to the configured GHL webhook URL.
 */

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL || "";
const VALID_PASSCODES = ["HIS-165686-PRO"];
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 submissions per minute per IP

const LeadSchema = z.object({
  passcode: z.string().min(1, "Passcode is required").max(50),
  email: z.string().email("Invalid email format").max(254),
  firstName: z.string().max(100).optional().default(""),
  lastName: z.string().max(100).optional().default(""),
  phone: z.string().max(30).optional().default(""),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limit check
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (rateLimit(ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate with Zod
    const result = LeadSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { passcode, email, firstName, lastName, phone } = result.data;

    // Server-side passcode validation — reject unauthorized activations
    if (!VALID_PASSCODES.includes(passcode.trim())) {
      return NextResponse.json(
        { error: "Invalid passcode. Please check your invitation and try again." },
        { status: 403 }
      );
    }

    // Build GHL-compatible payload (sanitized)
    const ghlPayload = {
      passcode: sanitize(passcode),
      email: email.toLowerCase().trim(),
      first_name: sanitize(firstName),
      last_name: sanitize(lastName),
      phone: sanitize(phone),
      source: "BYLDRS Guardian /join",
      tag: "guardian-member",
      vault_status: "activated",
      submitted_at: new Date().toISOString(),
    };

    // Forward to GHL webhook if configured
    if (GHL_WEBHOOK_URL) {
      try {
        const ghlRes = await fetch(GHL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ghlPayload),
        });

        if (!ghlRes.ok) {
          console.error(
            `[GHL] Webhook returned ${ghlRes.status}:`,
            await ghlRes.text()
          );
        } else {
          console.info(`[GHL] Lead captured: ${ghlPayload.email}`);
        }
      } catch (ghlErr) {
        console.error("[GHL] Webhook delivery failed:", ghlErr);
      }
    } else {
      console.info("[GHL] Webhook URL not configured. Lead data:", ghlPayload.email);
    }

    return NextResponse.json({
      success: true,
      message: "Vault activated. Redirecting to your dashboard.",
      email: ghlPayload.email,
    });
  } catch (error) {
    console.error("[GHL LEAD] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
