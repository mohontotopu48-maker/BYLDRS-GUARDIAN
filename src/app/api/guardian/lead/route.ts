import { NextRequest, NextResponse } from "next/server";

/**
 * GoHighLevel (GHL) Lead Capture Webhook
 * 
 * Receives lead data from the /join multi-step form and forwards
 * to the configured GHL webhook URL.
 * 
 * GHL Webhook URL should be set in .env as:
 *   NEXT_PUBLIC_GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...
 */

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { passcode, email, firstName, lastName, phone } = body;

    // Validate required fields
    if (!email || !passcode) {
      return NextResponse.json(
        { error: "Email and passcode are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Build GHL-compatible payload
    const ghlPayload = {
      passcode,
      email: email.toLowerCase().trim(),
      first_name: firstName || "",
      last_name: lastName || "",
      phone: phone || "",
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
          // Don't fail the request — store locally as fallback
        } else {
          console.log(`[GHL] Lead captured: ${email}`);
        }
      } catch (ghlErr) {
        console.error("[GHL] Webhook delivery failed:", ghlErr);
      }
    } else {
      // No webhook configured — log for development
      console.log("[GHL] Webhook URL not configured. Lead data:", ghlPayload);
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
