import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const email = formData.get("email") as string | null;

    if (!file || !email) {
      return NextResponse.json(
        { error: "Missing file or email" },
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

    // TODO: In production, store file and queue manual audit
    // For now, log and acknowledge receipt
    console.log(
      `[GUARDIAN AUDIT] New submission: ${file.name} (${(file.size / 1024).toFixed(1)}KB) → ${email}`
    );

    return NextResponse.json({
      success: true,
      message:
        "Bid received. A State-Registered Guardian will review your submission and email your Risk Report within 24 hours.",
      fileName: file.name,
      fileSize: file.size,
      email,
    });
  } catch (error) {
    console.error("[GUARDIAN AUDIT] Submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
