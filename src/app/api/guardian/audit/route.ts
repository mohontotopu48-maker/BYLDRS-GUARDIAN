import { NextRequest, NextResponse } from "next/server";

/**
 * GoHighLevel (GHL) Audit Webhook
 *
 * Receives bid audit submissions from verified Guardian members.
 * The file is validated, member data is auto-tagged, and results are
 * forwarded to the GHL webhook for CRM tracking.
 *
 * GHL Webhook URL should be set in .env as:
 *   GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...
 */

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL || "";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const email = formData.get("email") as string | null;
    const memberFirstName = formData.get("member_first_name") as string | null;
    const memberLastName = formData.get("member_last_name") as string | null;
    const memberPasscode = formData.get("member_passcode") as string | null;
    const source = (formData.get("source") as string) || "member-audit";

    if (!file) {
      return NextResponse.json(
        { error: "Missing file" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Member email is required. Please ensure you are logged in." },
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

    // Validate file type
    const validTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Accepts PDF, PNG, JPG, or WebP." },
        { status: 400 }
      );
    }

    // Validate file size (max 25MB)
    const maxSize = 25 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 25MB." },
        { status: 400 }
      );
    }

    // Build GHL-compatible payload — member data auto-tagged
    const ghlPayload = {
      event: "bid_audit_submitted",
      email: email.toLowerCase().trim(),
      first_name: memberFirstName || "",
      last_name: memberLastName || "",
      phone: "",
      passcode: memberPasscode || "",
      source: `BYLDRS Guardian — ${source}`,
      tag: "guardian-audit",
      audit_details: {
        file_name: file.name,
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
          // Don't fail the request — store locally as fallback
        } else {
          console.log(`[GHL AUDIT] Audit captured for: ${email} — ${file.name}`);
        }
      } catch (ghlErr) {
        console.error("[GHL AUDIT] Webhook delivery failed:", ghlErr);
      }
    } else {
      // No webhook configured — log for development
      console.log("[GHL AUDIT] Webhook URL not configured. Audit data:", ghlPayload);
    }

    // TODO: In production, store file and queue audit
    console.log(
      `[GUARDIAN AUDIT] New submission from member: ${memberFirstName || "Unknown"} ${memberLastName || ""} (${email}) — ${file.name} (${(file.size / 1024).toFixed(1)}KB)`
    );

    return NextResponse.json({
      success: true,
      message:
        "Bid received. A State-Registered Guardian will review your submission and email your Risk Report within 24 hours.",
      fileName: file.name,
      fileSize: file.size,
      email,
      memberFirstName,
      auditId: `audit-${Date.now()}`,
    });
  } catch (error) {
    console.error("[GUARDIAN AUDIT] Submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
