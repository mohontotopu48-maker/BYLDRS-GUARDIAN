"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  Lock,
  ArrowLeft,
  MessageSquare,
  Bot,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────
   BYLDRS GUARDIAN Logo (White version)
   ───────────────────────────────────────────── */
function GuardianLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <svg
        width="44"
        height="50"
        viewBox="0 0 44 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 1L2 12V28C2 39.1 10.68 49.34 22 50C33.32 49.34 42 39.1 42 28V12L22 1Z"
          fill="url(#shieldGrad2)"
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
            id="shieldGrad2"
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
   /ask-the-guardian — AI Auditor Landing Page
   ───────────────────────────────────────────── */
export default function AskTheGuardian() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* ─── Background ─── */}
      <div className="fixed inset-0 bg-[#002D72]" />
      <div className="fixed inset-0 hex-pattern" />

      {/* Ambient glow effects */}
      <div className="guardian-glow w-[500px] h-[500px] bg-[rgba(59,183,158,0.08)] top-[-100px] left-[-100px]" />
      <div className="guardian-glow w-[600px] h-[600px] bg-[rgba(0,45,114,0.5)] bottom-[-200px] right-[-150px]" />
      <div className="guardian-glow w-[400px] h-[400px] bg-[rgba(59,183,158,0.06)] top-[30%] left-[30%]" />

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
          <div className="sm:hidden">
            <ShieldCheck className="w-7 h-7 text-[#3BB79E]" />
          </div>
        </header>

        {/* ─── MAIN CONTENT ─── */}
        <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl"
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
                <span>Back to Guardian Portal</span>
              </Link>
            </motion.div>

            {/* Glass Card */}
            <div className="guardian-card rounded-2xl p-8 sm:p-12 relative text-center">
              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#3BB79E] to-transparent" />

              {/* AI Icon cluster */}
              <motion.div
                className="flex justify-center mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="relative">
                  {/* Outer ring pulse */}
                  <motion.div
                    className="absolute inset-[-12px] rounded-full border border-[rgba(59,183,158,0.15)]"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  {/* Main icon container */}
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[rgba(59,183,158,0.15)] to-[rgba(59,183,158,0.05)] border border-[rgba(59,183,158,0.25)] flex items-center justify-center relative">
                    <Bot className="w-12 h-12 text-[#3BB79E]" />
                    {/* Sparkle accents */}
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-[#3BB79E] opacity-60" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Guardian AI Auditor
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-base sm:text-lg text-[rgba(255,255,255,0.5)] mb-8 max-w-md mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                AI-powered contractor verification, bid auditing, and project
                protection — all in one intelligent interface.
              </motion.p>

              {/* Coming Soon Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
                className="inline-flex items-center gap-2.5 bg-[rgba(59,183,158,0.1)] border border-[rgba(59,183,158,0.25)] rounded-xl px-6 py-3.5"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Lock className="w-5 h-5 text-[#3BB79E]" />
                </motion.div>
                <div className="text-left">
                  <span className="block text-white font-bold text-sm tracking-wide uppercase">
                    Coming Soon
                  </span>
                  <span className="block text-[rgba(255,255,255,0.4)] text-xs mt-0.5">
                    The Vault is being fortified
                  </span>
                </div>
              </motion.div>

              {/* Feature hints */}
              <motion.div
                className="mt-10 pt-6 border-t border-[rgba(255,255,255,0.06)] grid grid-cols-1 sm:grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="flex flex-col items-center gap-2 p-3">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(59,183,158,0.1)] border border-[rgba(59,183,158,0.15)] flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#3BB79E]" />
                  </div>
                  <span className="text-[11px] text-[rgba(255,255,255,0.4)] font-medium">
                    Contractor Verification
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(59,183,158,0.1)] border border-[rgba(59,183,158,0.15)] flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[#3BB79E]" />
                  </div>
                  <span className="text-[11px] text-[rgba(255,255,255,0.4)] font-medium">
                    AI Bid Auditing
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(59,183,158,0.1)] border border-[rgba(59,183,158,0.15)] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#3BB79E]" />
                  </div>
                  <span className="text-[11px] text-[rgba(255,255,255,0.4)] font-medium">
                    Smart Risk Analysis
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
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
    </div>
  );
}
