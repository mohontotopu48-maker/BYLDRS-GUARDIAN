"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  Lock,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

/* ─────────────────────────────────────────────
   BYLDRS GUARDIAN Logo (White version)
   ───────────────────────────────────────────── */
function GuardianLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Shield Icon */}
      <svg
        width="44"
        height="50"
        viewBox="0 0 44 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 1L2 12V28C2 39.1 10.68 49.34 22 50C33.32 49.34 42 39.1 42 28V12L22 1Z"
          fill="url(#shieldGrad)"
          stroke="#3BB79E"
          strokeWidth="1.5"
        />
        <path
          d="M15 25L20 30L30 19"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="shieldGrad"
            x1="22"
            y1="1"
            x2="22"
            y2="50"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#002D72" />
            <stop offset="1" stopColor="#001D4A" />
          </linearGradient>
        </defs>
      </svg>
      {/* Text */}
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
   State-Registered Protection Badge
   ───────────────────────────────────────────── */
function ProtectionBadge() {
  return (
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
  );
}

/* ─────────────────────────────────────────────
   Main Splash Page
   ───────────────────────────────────────────── */
export default function Home() {
  const [passcode, setPasscode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus the input on mount
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setIsSubmitting(true);
    // Simulate brief processing
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/check-my-pro");
      }, 1200);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* ─── Background ─── */}
      <div className="fixed inset-0 bg-[#002D72]" />
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
          {/* Mobile badge - smaller */}
          <div className="sm:hidden">
            <ShieldCheck className="w-7 h-7 text-[#3BB79E]" />
          </div>
        </header>

        {/* ─── MAIN CONTENT ─── */}
        <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
          <AnimatePresence mode="wait">
            {!showSuccess ? (
              <motion.div
                key="card"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-xl"
              >
                {/* Glass Card */}
                <div className="guardian-card rounded-2xl p-6 sm:p-10 relative">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#3BB79E] to-transparent" />

                  {/* Shield icon with pulse */}
                  <div className="flex justify-center mb-6">
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

                  {/* Headline */}
                  <motion.h1
                    className="text-center text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Your Invitation to the Shield.
                  </motion.h1>

                  {/* Body Copy */}
                  <motion.p
                    className="text-center text-sm sm:text-base text-[rgba(255,255,255,0.6)] leading-relaxed mb-8 max-w-md mx-auto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                  >
                    Remodeling shouldn&apos;t be a gamble. Accept your complimentary
                    membership to access California&apos;s only AI-powered project
                    protection platform. Audit bids, verify contractors, and secure
                    your home in the Vault.
                  </motion.p>

                  {/* Form */}
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {/* Passcode Input */}
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

                    {/* CTA Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !passcode.trim()}
                      className="guardian-cta w-full py-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          <span>VERIFYING...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-5 h-5" />
                          <span>CLAIM YOUR LIFELONG PROTECTION</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>

                  {/* Trust indicators */}
                  <motion.div
                    className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
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
                  </motion.div>
                </div>

                {/* Mobile protection badge */}
                <motion.div
                  className="sm:hidden mt-4 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <ProtectionBadge />
                </motion.div>
              </motion.div>
            ) : (
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
                  className="w-20 h-20 rounded-full bg-[rgba(59,183,158,0.15)] border-2 border-[#3BB79E] flex items-center justify-center mx-auto mb-6"
                >
                  <ShieldCheck className="w-10 h-10 text-[#3BB79E]" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Access Granted
                </h2>
                <p className="text-[rgba(255,255,255,0.5)] text-sm">
                  Redirecting to your dashboard...
                </p>
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

      {/* ─── SIDE TAB: "ASK THE GUARDIAN (BETA)" ─── */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50"
      >
        <a
          href="#"
          className="side-tab flex items-center gap-2 bg-[#3BB79E] hover:bg-[#2A9B85] text-white px-3 py-5 rounded-l-xl shadow-lg shadow-[rgba(59,183,158,0.3)] transition-all duration-300 hover:shadow-[rgba(59,183,158,0.5)] group"
          aria-label="Ask the Guardian AI Assistant"
        >
          <MessageSquare className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase whitespace-nowrap">
            ASK THE GUARDIAN
            <br />
            <span className="text-[9px] font-medium tracking-[0.15em] opacity-70">
              (BETA)
            </span>
          </span>
        </a>
      </motion.div>
    </div>
  );
}
