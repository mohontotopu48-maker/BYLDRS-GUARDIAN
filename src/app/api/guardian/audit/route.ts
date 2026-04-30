import { NextRequest, NextResponse } from "next/server";
import { rateLimit, sanitize } from "@/lib/rate-limit";

/**
 * GoHighLevel (GHL) Audit Webhook
 *
 * Receives bid audit submissions from verified Guardian members.
 * The file is validated, member data is auto-tagged, and results are
 * forwarded to the GHL webhook for CRM tracking.
 */

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL || "";
const VALID_PASSCODES = ["HIS-165686-PRO"];
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3; // max 3 uploads per minute per IP

const VALID_FILE_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export async function POST(request: NextRequest) {
  try {
    // Rate limit check
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (rateLimit(ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
      return NextResponse.json(
        { error: "Too many uploads. Please try again in a minute." },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const email = formData.get("email") as string | null;
    const memberFirstName = formData.get("member_first_name") as string | null;
    const memberLastName = formData.get("member_last_name") as string | null;
    const memberPasscode = formData.get("member_passcode") as string | null;
    const source = (formData.get("source") as string) || "member-audit";

    // Validate required fields
    if (!file) {
      return NextResponse.json(
        { error: "Missing file" },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid member email is required." },
        { status: 400 }
      );
    }

    // Server-side passcode validation — reject unauthorized submissions
    if (!memberPasscode || !VALID_PASSCODES.includes(String(memberPasscode).trim())) {
      return NextResponse.json(
        { error: "Valid Guardian passcode is required for audit submissions." },
        { status: 403 }
      );
    }

    // Validate file type
    if (!VALID_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Accepts PDF, PNG, JPG, or WebP." },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 25MB." },
        { status: 400 }
      );
    }

    const auditId = `audit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // Build GHL-compatible payload — member data auto-tagged
    const ghlPayload = {
      event: "bid_audit_submitted",
      email: email.toLowerCase().trim(),
      first_name: sanitize(memberFirstName),
      last_name: sanitize(memberLastName),
      passcode: sanitize(memberPasscode),
      source: `BYLDRS Guardian — ${sanitize(source)}`,
      tag: "guardian-audit",
      audit_details: {
        audit_id: auditId,
        file_name: sanitize(file.name),
        file_size: file.size,
        file_type: file.type,
        submitted_at: new Date().toISOString(),
      },
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
            `[GHL AUDIT] Webhook returned ${ghlRes.status}:`,
            await ghlRes.text()
          );
        } else {
          console.info(`[GHL AUDIT] Audit captured for: ${ghlPayload.email} — ${file.name}`);
        }
      } catch (ghlErr) {
        console.error("[GHL AUDIT] Webhook delivery failed:", ghlErr);
      }
    } else {
      console.info("[GHL AUDIT] Webhook URL not configured. Audit data:", ghlPayload.email);
    }

    // TODO: In production, store file and queue audit

    return NextResponse.json({
      success: true,
      message:
        "Bid received. A State-Registered Guardian will review your submission and email your Risk Report within 24 hours.",
      fileName: file.name,
      fileSize: file.size,
      email: ghlPayload.email,
      memberFirstName: ghlPayload.first_name,
      auditId,
    });
  } catch (error) {
    console.error("[GUARDIAN AUDIT] Submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
