"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  Search,
  FileText,
  Lock,
  ChevronRight,
  ScanSearch,
  Eye,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

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
   Dashboard Action Card
   ───────────────────────────────────────────── */
function DashboardCard({
  icon: Icon,
  title,
  description,
  href,
  iconBg = "bg-[rgba(59,183,158,0.1)]",
  accent = "text-[#3BB79E]",
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  iconBg?: string;
  accent?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={href}
        className="group block guardian-card rounded-2xl p-6 sm:p-8 relative overflow-hidden hover:border-[rgba(59,183,158,0.35)] transition-all duration-300"
      >
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[rgba(59,183,158,0.05)] to-transparent" />

        <div className="relative z-10 flex items-start gap-4 sm:gap-5">
          {/* Icon */}
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl ${iconBg} border border-[rgba(59,183,158,0.15)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}
          >
            <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${accent}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 tracking-tight group-hover:text-white transition-colors">
              {title}
            </h3>
            <p className="text-sm text-[rgba(255,255,255,0.45)] leading-relaxed mb-4">
              {description}
            </p>
            <div className="flex items-center gap-1.5 text-[#3BB79E] text-sm font-semibold group-hover:gap-2.5 transition-all duration-300">
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Quick Stat Badge
   ───────────────────────────────────────────── */
function StatBadge({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-[rgba(0,20,60,0.4)] border border-[rgba(255,255,255,0.05)] rounded-xl px-4 py-3">
      <div className="w-9 h-9 rounded-lg bg-[rgba(59,183,158,0.1)] border border-[rgba(59,183,158,0.12)] flex items-center justify-center">
        <Icon className="w-4 h-4 text-[#3BB79E]" />
      </div>
      <div>
        <span className="block text-white font-bold text-lg leading-tight">{value}</span>
        <span className="block text-[10px] text-[rgba(255,255,255,0.35)] tracking-wide uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Member Dashboard Page
   ───────────────────────────────────────────── */
export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* ─── Background ─── */}
      <div className="fixed inset-0 bg-[#002D72]" />
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/guardian-home-bg.png')",
          mixBlendMode: "overlay",
          opacity: 0.12,
        }}
      />
      <div className="fixed inset-0 hex-pattern" />

      {/* Ambient glow effects */}
      <div className="guardian-glow w-[500px] h-[500px] bg-[rgba(59,183,158,0.06)] top-[-100px] left-[-100px]" />
      <div className="guardian-glow w-[600px] h-[600px] bg-[rgba(0,45,114,0.4)] bottom-[-200px] right-[-150px]" />

      {/* Scan line */}
      <div className="scan-line" />

      {/* ─── Content wrapper ─── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ─── HEADER ─── */}
        <header className="w-full px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between">
          <GuardianLogo />
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-[rgba(59,183,158,0.1)] border border-[rgba(59,183,158,0.2)] rounded-lg px-3 py-2">
              <ShieldCheck className="w-4 h-4 text-[#3BB79E]" />
              <span className="text-xs font-semibold text-[#3BB79E] tracking-wide">VAULT ACTIVE</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3BB79E] to-[#2A9B85] flex items-center justify-center text-white font-bold text-sm">
              G
            </div>
          </div>
        </header>

        {/* ─── MAIN CONTENT ─── */}
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
          <div className="max-w-3xl mx-auto">
            {/* Welcome banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                Welcome to Your Vault, Guardian.
              </h1>
              <p className="text-sm text-[rgba(255,255,255,0.45)] max-w-lg">
                Your lifelong protection is now active. Choose an action below to
                start securing your next remodeling project.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
            >
              <StatBadge icon={ShieldCheck} value="1" label="Vault Status" />
              <StatBadge icon={Search} value="—" label="Saved Searches" />
              <StatBadge icon={FileText} value="0" label="Audited Bids" />
              <StatBadge icon={Zap} value="New" label="Membership" />
            </motion.div>

            {/* ─── THREE DASHBOARD ACTION CARDS ─── */}
            <div className="space-y-4">
              {/* 1. Find Audited Pros */}
              <DashboardCard
                icon={Search}
                title="Find Audited Pros"
                description="Search our verified contractor database. Every pro has been checked against the CSLB and carries the Shield-Verified badge."
                href="/dashboard/roofing"
                delay={0.2}
              />

              {/* 2. Audit a Bid */}
              <DashboardCard
                icon={ScanSearch}
                title="Audit a Bid"
                description="Upload a contractor's bid or contract (PDF or image). Our AI and manual review team will flag Red Flags and deliver your Risk Report."
                href="/ask-the-guardian"
                iconBg="bg-[rgba(59,183,158,0.1)]"
                delay={0.3}
              />

              {/* 3. My Shield Vault */}
              <DashboardCard
                icon={Lock}
                title="My Shield Vault"
                description="Your encrypted vault for storing contracts, permits, insurance docs, and project records. Protected and accessible anytime."
                href="#"
                iconBg="bg-[rgba(201,168,76,0.1)]"
                accent="text-[#C9A84C]"
                delay={0.4}
              />
            </div>

            {/* Tip banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 flex items-center gap-3 bg-[rgba(0,20,60,0.4)] border border-[rgba(59,183,158,0.15)] rounded-xl px-5 py-4"
            >
              <Star className="w-5 h-5 text-[#C9A84C] shrink-0" />
              <p className="text-[12px] text-[rgba(255,255,255,0.4)] leading-relaxed">
                <span className="text-white font-semibold">Pro Tip:</span> Start by searching for
                a contractor in your project category (e.g., Roofing, Plumbing). Every
                Shield-Verified pro has been vetted by our State-Registered Guardians.
              </p>
            </motion.div>
          </div>
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
    </div>
  );
}
