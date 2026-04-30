"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemberStore } from "@/lib/store/member-store";
import {
  Shield,
  ShieldCheck,
  ArrowLeft,
  Upload,
  FileText,
  Mail,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  ScanSearch,
  Sparkles,
  Lock,
  UserCheck,
} from "lucide-react";

/* ─────────────────────────────────────────────
   InlineGuard — Locks specific sections for non-members
   ───────────────────────────────────────────── */
function InlineGuard({ children }: { children: React.ReactNode }) {
  const isHydrated = useMemberStore((s) => s.isHydrated);
  const isVerified = useMemberStore((s) => s.isVerified);

  if (!isHydrated) {
    // Don't show anything while hydrating — avoid flash of lock
    return null;
  }

  if (!isVerified) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="guardian-input rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center gap-4 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center">
          <Lock className="w-7 h-7 text-[#C9A84C]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white mb-1.5">
            Shield Passcode Required for Professional Audits
          </h3>
          <p className="text-sm text-[rgba(255,255,255,0.45)] leading-relaxed max-w-xs mx-auto">
            Upload your contractor&apos;s bid or contract for an AI-powered Red Flag
            scan. Sign in with your Guardian passcode to unlock this feature.
          </p>
        </div>
        <Link
          href="/"
          className="guardian-cta px-6 py-3 rounded-xl text-sm flex items-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>GET YOUR PASSCODE</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>
    );
  }

  return <>{children}</>;
}

/* ─────────────────────────────────────────────
   BYLDRS GUARDIAN Logo
   ───────────────────────────────────────────── */
function GuardianLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <img
        src="/guardian-logo.png"
        alt="BYLDRS GUARDIAN"
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-contain"
      />
      <div className="flex flex-col leading-none">
        <span className="text-white text-xl font-bold tracking-[0.2em] uppercase group-hover:text-white/90 transition-colors">
          BYLDRS
        </span>
        <span className="text-[#3BB79E] text-lg font-semibold tracking-[0.35em] uppercase">
          GUARDIAN
        </span>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Dashboard Header — Reused on sub-pages
   ───────────────────────────────────────────── */
function DashboardHeader() {
  return (
    <header className="w-full px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between">
      <GuardianLogo />
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Shield Active */}
        <div className="flex items-center gap-2 bg-[rgba(59,183,158,0.1)] border border-[rgba(59,183,158,0.2)] rounded-lg px-3 py-2">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 8px rgba(59,183,158,0.3)",
                "0 0 16px rgba(59,183,158,0.5)",
                "0 0 8px rgba(59,183,158,0.3)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-[#3BB79E]"
          />
          <ShieldCheck className="w-4 h-4 text-[#3BB79E] hidden sm:block" />
          <span className="text-[10px] sm:text-xs font-semibold text-[#3BB79E] tracking-wide">
            SHIELD ACTIVE
          </span>
        </div>

        {/* My Vault */}
        <Link
          href="#"
          className="flex items-center gap-2 bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.15)] rounded-lg px-3 py-2 hover:bg-[rgba(201,168,76,0.12)] transition-all duration-300"
        >
          <FileText className="w-4 h-4 text-[#C9A84C]" />
          <span className="text-[10px] sm:text-xs font-semibold text-[#C9A84C] tracking-wide hidden sm:block">
            MY VAULT
          </span>
        </Link>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────
   File Upload Zone Component
   ───────────────────────────────────────────── */
function FileUploadZone({
  onFileSelect,
  file,
  onClear,
}: {
  onFileSelect: (file: File) => void;
  file: File | null;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) {
        const validTypes = [
          "application/pdf",
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/webp",
        ];
        if (validTypes.includes(droppedFile.type)) {
          onFileSelect(droppedFile);
        }
      }
    },
    [onFileSelect]
  );

  if (file) {
    return (
      <div className="relative guardian-input rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[rgba(59,183,158,0.15)] border border-[rgba(59,183,158,0.2)] flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 text-[#3BB79E]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white truncate font-medium">{file.name}</p>
          <p className="text-[11px] text-[rgba(255,255,255,0.4)]">
            {(file.size / 1024).toFixed(1)} KB
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="w-7 h-7 rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,100,100,0.15)] flex items-center justify-center transition-colors"
        >
          <X className="w-3.5 h-3.5 text-[rgba(255,255,255,0.5)]" />
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`
        guardian-input rounded-xl p-6 flex flex-col items-center justify-center gap-3
        cursor-pointer transition-all duration-200
        ${isDragging ? "border-[#3BB79E] bg-[rgba(59,183,158,0.08)]" : ""}
      `}
    >
      <div
        className={`w-12 h-12 rounded-xl border-2 border-dashed flex items-center justify-center transition-colors ${
          isDragging
            ? "border-[#3BB79E] bg-[rgba(59,183,158,0.1)]"
            : "border-[rgba(59,183,158,0.3)] bg-[rgba(59,183,158,0.05)]"
        }`}
      >
        <Upload
          className={`w-5 h-5 transition-colors ${
            isDragging ? "text-[#3BB79E]" : "text-[rgba(255,255,255,0.35)]"
          }`}
        />
      </div>
      <div className="text-center">
        <p className="text-sm text-white font-medium">
          Upload Your Contractor&apos;s Bid/Contract
        </p>
        <p className="text-[11px] text-[rgba(255,255,255,0.35)] mt-1">
          PDF, PNG, or JPG — Drag &amp; drop or click to browse
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,.webp"
        className="hidden"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) onFileSelect(selectedFile);
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   /ask-the-guardian — Bid Audit Page (PUBLIC — no AuthGuard)
   Text-chat section is open to everyone.
   File upload (Bid Auditor) is locked behind InlineGuard.
   ───────────────────────────────────────────── */
export default function AskTheGuardian() {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Member session data — auto-tagged with every audit submission
  const isVerified = useMemberStore((s) => s.isVerified);
  const memberEmail = useMemberStore((s) => s.email);
  const memberFirstName = useMemberStore((s) => s.firstName);
  const memberLastName = useMemberStore((s) => s.lastName);
  const memberPasscode = useMemberStore((s) => s.passcode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !isVerified) return;

    setIsSubmitting(true);
    setSubmitState("idle");

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Auto-tag with member email and data
      formData.append("email", memberEmail);
      formData.append("member_first_name", memberFirstName);
      formData.append("member_last_name", memberLastName);
      formData.append("member_passcode", memberPasscode);
      formData.append("source", "member-dashboard-audit");

      const res = await fetch(
        "/api/guardian/audit?XTransformPort=3000",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Submission failed");

      setSubmitState("success");
      setFile(null);
    } catch {
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = file !== null && isVerified;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* ─── Background ─── */}
      <div className="fixed inset-0 bg-[#002D72]" />
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/guardian-home-bg.png')",
          mixBlendMode: "overlay",
          opacity: 0.15,
        }}
      />
      <div className="fixed inset-0 hex-pattern" />

      {/* Ambient glow effects */}
      <div className="guardian-glow w-[500px] h-[500px] bg-[rgba(59,183,158,0.08)] top-[-100px] left-[-100px]" />
      <div className="guardian-glow w-[600px] h-[600px] bg-[rgba(0,45,114,0.5)] bottom-[-200px] right-[-150px]" />
      <div className="guardian-glow w-[400px] h-[400px] bg-[rgba(59,183,158,0.06)] top-[30%] left-[30%]" />

      {/* Scan line effect */}
      <div className="scan-line" />

      {/* ─── Content wrapper ─── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <DashboardHeader />

        {/* ─── MAIN CONTENT ─── */}
        <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl"
          >
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mb-8"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[rgba(255,255,255,0.45)] hover:text-[#3BB79E] transition-colors duration-200 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </motion.div>

            {/* Glass Card */}
            <div className="guardian-card rounded-2xl p-6 sm:p-10 relative">
              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#3BB79E] to-transparent" />

              {/* AI + Human icon cluster */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="relative">
                  {/* Outer ring pulse */}
                  <motion.div
                    className="absolute inset-[-10px] rounded-full border border-[rgba(59,183,158,0.15)]"
                    animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  {/* Main icon container */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[rgba(59,183,158,0.15)] to-[rgba(59,183,158,0.05)] border border-[rgba(59,183,158,0.25)] flex items-center justify-center relative">
                    <ScanSearch className="w-10 h-10 text-[#3BB79E]" />
                    {/* Sparkle accent */}
                    <motion.div
                      className="absolute -top-1.5 -right-1.5"
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4 text-[#3BB79E] opacity-60" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Get Your Professional Bid Audit.
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                className="text-sm text-[rgba(255,255,255,0.5)] mb-3 text-center leading-relaxed max-w-md mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Upload a contractor&apos;s bid or contract. Our AI and State-Registered
                Guardians will flag Red Flags and deliver your Risk Report.
              </motion.p>

              {/* Member auto-tag notice — only shown when verified */}
              {isVerified && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65, duration: 0.4 }}
                  className="flex items-center justify-center gap-2 mb-6"
                >
                  <Mail className="w-3 h-3 text-[rgba(255,255,255,0.3)]" />
                  <span className="text-[11px] text-[rgba(255,255,255,0.35)]">
                    Results will be sent to <span className="text-white font-medium">{memberEmail}</span>
                  </span>
                </motion.div>
              )}

              {/* ─── AUDIT FORM ─── */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {/* ──── BID AUDITOR (File Upload) — LOCKED for non-members ──── */}
                <InlineGuard>
                  {/* Only renders when isVerified === true */}
                  <FileUploadZone
                    onFileSelect={setFile}
                    file={file}
                    onClear={() => setFile(null)}
                  />
                </InlineGuard>

                {/* Hidden email field — auto-populated from session */}
                <input type="hidden" name="email" value={memberEmail} />
                <input type="hidden" name="member_first_name" value={memberFirstName} />
                <input type="hidden" name="member_last_name" value={memberLastName} />

                {/* Status messages */}
                {submitState === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 bg-[rgba(59,183,158,0.1)] border border-[rgba(59,183,158,0.25)] rounded-xl px-4 py-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#3BB79E] shrink-0" />
                    <div>
                      <p className="text-sm text-white font-medium">
                        Bid received, {memberFirstName || "homeowner"}!
                      </p>
                      <p className="text-[12px] text-[rgba(255,255,255,0.5)] mt-0.5">
                        Your Guardian will review and email the Risk Report to{" "}
                        <span className="text-[#3BB79E]">{memberEmail || "your inbox"}</span> within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitState === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 bg-[rgba(255,80,80,0.1)] border border-[rgba(255,80,80,0.2)] rounded-xl px-4 py-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <p className="text-sm text-red-300">
                      Something went wrong. Please try again or email your bid
                      directly to support.
                    </p>
                  </motion.div>
                )}

                {/* CTA Button — only visible to verified members */}
                {isVerified && (
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="guardian-cta w-full py-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>SUBMITTING TO GUARDIAN...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        <span>START MANUAL AUDIT</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </motion.form>

              {/* Trust indicators */}
              <motion.div
                className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.5 }}
              >
                <div className="flex items-center gap-1.5 text-[11px] text-[rgba(255,255,255,0.4)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3BB79E]" />
                  <span>Secure Upload</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[rgba(255,255,255,0.4)]">
                  <Shield className="w-3.5 h-3.5 text-[#3BB79E]" />
                  <span>Auto-Tagged</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[rgba(255,255,255,0.4)]">
                  <Mail className="w-3.5 h-3.5 text-[#3BB79E]" />
                  <span>24hr Report</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>

        {/* ─── FOOTER ─── */}
        <footer className="relative z-10 px-4 sm:px-6 lg:px-10 py-6 border-t border-[rgba(255,255,255,0.05)] mt-auto">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-[11px] text-[rgba(255,255,255,0.35)] tracking-wide">
                Powered by{" "}
                <a
                  href="https://vsualdigitalmedia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgba(255,255,255,0.5)] hover:text-[#3BB79E] transition-colors duration-200"
                >
                  VSUALdigitalmedia.com
                </a>
              </p>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-[rgba(255,255,255,0.35)]">
              <span className="flex items-center gap-1.5">
                <span>Office Locations:</span>
                <span className="text-[rgba(255,255,255,0.45)]">
                  Santa Fe Springs
                </span>
                <span className="text-[rgba(255,255,255,0.15)]">|</span>
                <span className="text-[rgba(255,255,255,0.45)]">Irvine, CA</span>
              </span>
              <span className="text-[rgba(255,255,255,0.1)]">|</span>
              <a
                href="https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=165686"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(59,183,158,0.6)] hover:text-[#3BB79E] transition-colors duration-200 flex items-center gap-1"
              >
                <ShieldCheck className="w-3 h-3" />
                Verify on CSLB
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
