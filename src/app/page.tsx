"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useMemberStore } from "@/lib/store/member-store";
import {
  Shield,
  ShieldCheck,
  Lock,
  ChevronRight,
  ChevronLeft,
  FileText,
  ScanSearch,
  Eye,
  Mail,
  User,
  Phone,
  CheckCircle2,
  Loader2,
} from "lucide-react";

/* ─────────────────────────────────────────────
   BYLDRS GUARDIAN Logo
   ───────────────────────────────────────────── */
function GuardianLogo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/guardian-logo.png"
        alt="BYLDRS GUARDIAN"
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-contain"
      />
      <div className="flex flex-col leading-none">
        <span className="text-white text-xl font-bold tracking-[0.2em] uppercase">
          BYLDRS
        </span>
        <span className="text-[#3BB79E] text-lg font-semibold tracking-[0.35em] uppercase">
          GUARDIAN
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   State-Registered Protection Badge + Guardian Avatar
   ───────────────────────────────────────────── */
function ProtectionBadge() {
  return (
    <div className="flex flex-col items-end gap-2">
      <div className="badge-shine flex items-center gap-2.5 bg-[rgba(0,20,60,0.7)] border border-[rgba(59,183,158,0.3)] rounded-lg px-4 py-2.5 backdrop-blur-sm">
        <ShieldCheck className="w-5 h-5 text-[#3BB79E] shrink-0" />
        <div className="flex flex-col">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-[rgba(255,255,255,0.5)] leading-tight">
            State-Registered Protection
          </span>
          <span className="text-sm font-bold text-white tracking-wide">
            #165686 SP
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[rgba(59,183,158,0.2)] border border-[rgba(59,183,158,0.3)] flex items-center justify-center">
          <Shield className="w-3 h-3 text-[#3BB79E]" />
        </div>
        <span className="text-[10px] text-[rgba(255,255,255,0.4)] tracking-wide leading-tight">
          Protection managed by California Registered Professionals.
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Step Indicator
   ───────────────────────────────────────────── */
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            i < current
              ? "w-8 bg-[#3BB79E]"
              : i === current
                ? "w-8 bg-[rgba(59,183,158,0.3)]"
                : "w-6 bg-[rgba(255,255,255,0.1)]"
          }`}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Splash Page — Multi-Step Form
   ───────────────────────────────────────────── */
export default function Home() {
  const [step, setStep] = useState(1); // 1 = passcode, 2 = email, 3 = success
  const [passcode, setPasscode] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Focus email input when step changes to 2
  useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        const el = document.getElementById("email-input");
        el?.focus();
      }, 300);
    }
  }, [step]);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    setErrorMsg("");
    setStep(2);
  };

  const activate = useMemberStore((s) => s.activate);

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !firstName.trim()) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/guardian/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passcode: passcode.trim(),
          email: email.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Activation failed");
      }

      // Set Verified Member session state (persists in localStorage)
      activate({
        email: email.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        passcode: passcode.trim(),
      });

      setStep(3);
      // Redirect to dashboard after success animation
      setTimeout(() => {
        router.push("/dashboard");
      }, 1800);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* ─── Background Layers ─── */}
      <div className="fixed inset-0 bg-[#002D72]" />
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/guardian-home-bg.png')",
          mixBlendMode: "overlay",
          opacity: 0.2,
        }}
      />
      <div className="fixed inset-0 hex-pattern" />

      {/* Ambient glow effects */}
      <div className="guardian-glow w-[500px] h-[500px] bg-[rgba(59,183,158,0.08)] top-[-100px] left-[-100px]" />
      <div className="guardian-glow w-[600px] h-[600px] bg-[rgba(0,45,114,0.5)] bottom-[-200px] right-[-150px]" />
      <div className="guardian-glow w-[300px] h-[300px] bg-[rgba(59,183,158,0.05)] top-[40%] right-[10%]" />

      {/* Scan line effect */}
      <div className="scan-line" />

      {/* ─── Content wrapper ─── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ─── HEADER ─── */}
        <header className="w-full px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between">
          <GuardianLogo />
          <div className="hidden sm:block">
            <ProtectionBadge />
          </div>
          <div className="sm:hidden flex flex-col items-end gap-1.5">
            <ShieldCheck className="w-7 h-7 text-[#3BB79E]" />
            <span className="text-[9px] text-[rgba(255,255,255,0.35)] text-right leading-tight max-w-[120px]">
              Managed by CA Registered Professionals
            </span>
          </div>
        </header>

        {/* ─── MAIN CONTENT ─── */}
        <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
          <AnimatePresence mode="wait">
            {/* ──── STEP 3: SUCCESS ──── */}
            {step === 3 ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className="w-24 h-24 rounded-full bg-[rgba(59,183,158,0.15)] border-2 border-[#3BB79E] flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-[#3BB79E]" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Vault Activated.
                </h2>
                <p className="text-[rgba(255,255,255,0.5)] text-sm">
                  Welcome to the Guardian. Redirecting to your dashboard...
                </p>
              </motion.div>
            ) : (
              /* ──── STEPS 1 & 2: FORM CARD ──── */
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: step === 2 ? -30 : 30 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-xl"
              >
                {/* Glass Card */}
                <div className="guardian-card rounded-2xl p-6 sm:p-10 relative">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#3BB79E] to-transparent" />

                  {/* Step Indicator */}
                  <StepIndicator current={step} total={2} />

                  {/* Shield icon with pulse */}
                  <div className="flex justify-center mb-5">
                    <motion.div
                      className="shield-pulse"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(59,183,158,0.1)",
                          "0 0 40px rgba(59,183,158,0.2)",
                          "0 0 20px rgba(59,183,158,0.1)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgba(59,183,158,0.15)] to-[rgba(59,183,158,0.05)] border border-[rgba(59,183,158,0.2)] flex items-center justify-center">
                        <Shield className="w-8 h-8 text-[#3BB79E]" />
                      </div>
                    </motion.div>
                  </div>

                  {/* ─── STEP 1: PASSCODE ─── */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h1 className="text-center text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                        Your Invitation to the Shield.
                      </h1>
                      <p className="text-center text-sm sm:text-base text-[rgba(255,255,255,0.6)] leading-relaxed mb-8 max-w-md mx-auto">
                        Remodeling shouldn&apos;t be a gamble. Accept your complimentary
                        membership to access California&apos;s only AI-powered project
                        protection platform.
                      </p>

                      <form onSubmit={handleStep1} className="space-y-4">
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.3)]" />
                          <input
                            ref={inputRef}
                            type="text"
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            placeholder="Enter Passcode (e.g., HIS-165686-PRO)"
                            className="guardian-input w-full pl-11 pr-4 py-4 rounded-xl text-base font-mono tracking-wider"
                            autoComplete="off"
                            spellCheck={false}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={!passcode.trim()}
                          className="guardian-cta w-full py-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          <ShieldCheck className="w-5 h-5" />
                          <span>CLAIM YOUR LIFELONG PROTECTION</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* ─── STEP 2: EMAIL CONFIRMATION ─── */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <h1 className="text-center text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                        Confirm Your Email to Activate.
                      </h1>
                      <p className="text-center text-sm text-[rgba(255,255,255,0.5)] leading-relaxed mb-7 max-w-sm mx-auto">
                        Almost there! Your passcode is verified. Complete your profile
                        to unlock the Guardian Vault.
                      </p>

                      {/* Passcode confirmed badge */}
                      <div className="flex items-center justify-center gap-2 mb-6 bg-[rgba(59,183,158,0.1)] border border-[rgba(59,183,158,0.2)] rounded-lg px-3 py-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#3BB79E]" />
                        <span className="text-xs font-medium text-[#3BB79E] tracking-wide">
                          Passcode Verified: {passcode}
                        </span>
                      </div>

                      <form onSubmit={handleStep2} className="space-y-3">
                        {/* Name row */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.3)]" />
                            <input
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="First Name *"
                              className="guardian-input w-full pl-10 pr-3 py-3.5 rounded-xl text-sm"
                              autoComplete="given-name"
                              required
                            />
                          </div>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.3)]" />
                            <input
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Last Name"
                              className="guardian-input w-full pl-10 pr-3 py-3.5 rounded-xl text-sm"
                              autoComplete="family-name"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.3)]" />
                          <input
                            id="email-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address *"
                            className="guardian-input w-full pl-10 pr-3 py-3.5 rounded-xl text-sm"
                            autoComplete="email"
                            required
                          />
                        </div>

                        {/* Phone (optional) */}
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.3)]" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone Number (optional)"
                            className="guardian-input w-full pl-10 pr-3 py-3.5 rounded-xl text-sm"
                            autoComplete="tel"
                          />
                        </div>

                        {/* Error message */}
                        {errorMsg && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-400 text-center"
                          >
                            {errorMsg}
                          </motion.p>
                        )}

                        {/* Back + Submit buttons */}
                        <div className="flex items-center gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setStep(1);
                              setErrorMsg("");
                            }}
                            className="flex items-center gap-1.5 text-xs text-[rgba(255,255,255,0.4)] hover:text-[#3BB79E] transition-colors shrink-0"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            <span>Back</span>
                          </button>
                          <button
                            type="submit"
                            disabled={!email.trim() || !firstName.trim() || isSubmitting}
                            className="guardian-cta flex-1 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>ACTIVATING...</span>
                              </>
                            ) : (
                              <>
                                <ShieldCheck className="w-5 h-5" />
                                <span>ACTIVATE MY VAULT</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* Trust indicators */}
                  <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-[rgba(255,255,255,0.4)]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#3BB79E]" />
                      <span>CSLB Verified</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[rgba(255,255,255,0.4)]">
                      <Lock className="w-3.5 h-3.5 text-[#3BB79E]" />
                      <span>256-bit Encrypted</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[rgba(255,255,255,0.4)]">
                      <Shield className="w-3.5 h-3.5 text-[#3BB79E]" />
                      <span>AI-Powered</span>
                    </div>
                  </div>
                </div>

                {/* ─── WHAT'S INSIDE? — Three Feature Cards (Step 1 only) ─── */}
                {step === 1 && (
                  <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    <p className="text-center text-[11px] font-semibold tracking-[0.25em] uppercase text-[rgba(255,255,255,0.3)] mb-5">
                      What&apos;s Inside?
                    </p>
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                      <div className="flex flex-col items-center text-center gap-2.5 p-3 sm:p-4 rounded-xl bg-[rgba(0,20,60,0.35)] border border-[rgba(255,255,255,0.05)] backdrop-blur-sm">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[rgba(59,183,158,0.1)] border border-[rgba(59,183,158,0.15)] flex items-center justify-center">
                          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                          <span className="block text-[11px] sm:text-xs font-bold text-white tracking-wide">The Vault</span>
                          <span className="block text-[9px] sm:text-[10px] text-[rgba(255,255,255,0.4)] mt-1 leading-snug max-w-[120px] mx-auto">Your secure home for contracts &amp; permits.</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center text-center gap-2.5 p-3 sm:p-4 rounded-xl bg-[rgba(0,20,60,0.35)] border border-[rgba(255,255,255,0.05)] backdrop-blur-sm">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[rgba(59,183,158,0.1)] border border-[rgba(59,183,158,0.15)] flex items-center justify-center">
                          <ScanSearch className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                          <span className="block text-[11px] sm:text-xs font-bold text-white tracking-wide">The Auditor</span>
                          <span className="block text-[9px] sm:text-[10px] text-[rgba(255,255,255,0.4)] mt-1 leading-snug max-w-[120px] mx-auto">AI-powered bid scanning for Red Flags.</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center text-center gap-2.5 p-3 sm:p-4 rounded-xl bg-[rgba(0,20,60,0.35)] border border-[rgba(255,255,255,0.05)] backdrop-blur-sm">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[rgba(59,183,158,0.1)] border border-[rgba(59,183,158,0.15)] flex items-center justify-center">
                          <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                          <span className="block text-[11px] sm:text-xs font-bold text-white tracking-wide">The Shield</span>
                          <span className="block text-[9px] sm:text-[10px] text-[rgba(255,255,255,0.4)] mt-1 leading-snug max-w-[120px] mx-auto">Live CSLB &amp; Insurance monitoring.</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Mobile protection badge */}
                <motion.div
                  className="sm:hidden mt-4 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  <div className="badge-shine flex items-center gap-2.5 bg-[rgba(0,20,60,0.7)] border border-[rgba(59,183,158,0.3)] rounded-lg px-4 py-2.5 backdrop-blur-sm">
                    <ShieldCheck className="w-5 h-5 text-[#3BB79E] shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-[rgba(255,255,255,0.5)] leading-tight">State-Registered Protection</span>
                      <span className="text-sm font-bold text-white tracking-wide">#165686 SP</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* ─── FOOTER ─── */}
        <footer className="relative z-10 px-4 sm:px-6 lg:px-10 py-6 border-t border-[rgba(255,255,255,0.05)]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-[11px] text-[rgba(255,255,255,0.35)] tracking-wide">
                Powered by{" "}
                <a href="https://vsualdigitalmedia.com" target="_blank" rel="noopener noreferrer" className="text-[rgba(255,255,255,0.5)] hover:text-[#3BB79E] transition-colors duration-200">
                  VSUALdigitalmedia.com
                </a>
              </p>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-[rgba(255,255,255,0.35)]">
              <span className="flex items-center gap-1.5">
                <span>Office Locations:</span>
                <span className="text-[rgba(255,255,255,0.45)]">Santa Fe Springs</span>
                <span className="text-[rgba(255,255,255,0.15)]">|</span>
                <span className="text-[rgba(255,255,255,0.45)]">Irvine, CA</span>
              </span>
              <span className="text-[rgba(255,255,255,0.1)]">|</span>
              <a href="https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=165686" target="_blank" rel="noopener noreferrer" className="text-[rgba(59,183,158,0.6)] hover:text-[#3BB79E] transition-colors duration-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Verify on CSLB
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* ─── SIDE TAB ─── */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50"
      >
        <button
          type="button"
          onClick={() => router.push("/ask-the-guardian")}
          className="guardian-side-tab group relative flex flex-col items-center justify-center bg-[#3BB79E] text-white pl-4 pr-3 pt-6 pb-8 cursor-pointer select-none border-none outline-none shadow-[0_0_20px_rgba(59,183,158,0.35)]"
          style={{ borderRadius: "20px 0 0 20px" }}
          aria-label="Ask the Guardian AI Assistant"
        >
          <ChevronLeft className="w-5 h-5 text-white shrink-0 mb-3 transition-transform duration-300 ease-out group-hover:-translate-x-[3px]" />
          <span className="[writing-mode:vertical-lr] [text-orientation:mixed] text-[11px] font-bold tracking-[0.22em] uppercase whitespace-nowrap text-white leading-none">
            ASK THE GUARDIAN
          </span>
          <span className="mt-3 text-[8px] font-semibold tracking-[0.18em] uppercase bg-white/15 rounded-sm px-1.5 py-0.5 [writing-mode:horizontal-tb] text-white/85">
            BETA
          </span>
        </button>
      </motion.div>
    </div>
  );
}
