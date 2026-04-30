"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthGuard } from "@/components/auth-guard";
import { useMemberStore } from "@/lib/store/member-store";
import {
  ShieldCheck,
  Search,
  FileText,
  Lock,
  ChevronRight,
  ScanSearch,
  Zap,
  FolderOpen,
  LogOut,
  Star,
} from "lucide-react";
import { GuardianLogo } from "@/components/guardian-logo";
import { GuardianFooter } from "@/components/guardian-footer";



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
   Dashboard Header — Shield Active + My Vault
   ───────────────────────────────────────────── */
function DashboardHeader() {
  const router = useRouter();
  const deactivate = useMemberStore((s) => s.deactivate);

  return (
    <header className="w-full px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between">
      <GuardianLogo />

      <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
        {/* Shield Active Status */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center gap-2 bg-[rgba(59,183,158,0.1)] border border-[rgba(59,183,158,0.2)] rounded-lg px-3 py-2"
        >
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
        </motion.div>

        {/* My Vault Button */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 sm:gap-2 bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.15)] rounded-lg px-2 sm:px-3 py-2 hover:bg-[rgba(201,168,76,0.12)] hover:border-[rgba(201,168,76,0.25)] transition-all duration-300"
            aria-label="My Vault"
          >
            <FolderOpen className="w-4 h-4 text-[#C9A84C]" />
            <span className="text-[10px] sm:text-xs font-semibold text-[#C9A84C] tracking-wide hidden sm:block">
              MY VAULT
            </span>
          </Link>
        </motion.div>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          onClick={() => {
            deactivate();
            router.push("/");
          }}
          className="flex items-center gap-1.5 text-[rgba(255,255,255,0.3)] hover:text-red-400 transition-colors px-2 py-2 rounded-lg hover:bg-[rgba(255,80,80,0.05)]"
          title="Sign out"
          aria-label="Sign out of your account"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-[10px] hidden sm:block">Sign Out</span>
        </motion.button>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────
   Member Dashboard Page
   ───────────────────────────────────────────── */
export default function Dashboard() {
  const firstName = useMemberStore((s) => s.firstName);
  const lastName = useMemberStore((s) => s.lastName);
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim() || "Guardian";

  return (
    <AuthGuard>
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
          <DashboardHeader />

          {/* ─── MAIN CONTENT ─── */}
          <main id="main-content" className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
            <div className="max-w-3xl mx-auto">
              {/* Welcome banner — personalized */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3BB79E] to-[#2A9B85] flex items-center justify-center text-white font-bold text-sm"
                  >
                    {firstName.charAt(0).toUpperCase()}
                  </motion.div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Welcome back, {fullName}.
                  </h1>
                </div>
                <p className="text-sm text-[rgba(255,255,255,0.45)] max-w-lg">
                  Your Shield is active and your Vault is ready. Choose an action
                  below to start securing your next remodeling project.
                </p>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
              >
                <StatBadge icon={ShieldCheck} value="Active" label="Vault Status" />
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
                  href="/dashboard"
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

          <GuardianFooter />
        </div>
      </div>
    </AuthGuard>
  );
}
