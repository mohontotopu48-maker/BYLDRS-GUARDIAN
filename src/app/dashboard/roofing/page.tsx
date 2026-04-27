"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AuthGuard } from "@/components/auth-guard";
import { useMemberStore } from "@/lib/store/member-store";
import {
  Shield,
  ShieldCheck,
  Star,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Phone,
  Clock,
  Award,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  Search,
  FolderOpen,
  UserCheck,
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
   Dashboard Header — Reused on sub-pages
   ───────────────────────────────────────────── */
function DashboardHeader() {
  const deactivate = useMemberStore((s) => s.deactivate);

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
          <FolderOpen className="w-4 h-4 text-[#C9A84C]" />
          <span className="text-[10px] sm:text-xs font-semibold text-[#C9A84C] tracking-wide hidden sm:block">
            MY VAULT
          </span>
        </Link>

        {/* Sign Out */}
        <button
          onClick={() => {
            deactivate();
            window.location.href = "/";
          }}
          className="flex items-center gap-1.5 text-[rgba(255,255,255,0.3)] hover:text-red-400 transition-colors px-2 py-2 rounded-lg hover:bg-[rgba(255,80,80,0.05)]"
          title="Sign out"
        >
          <Shield className="w-4 h-4" />
          <span className="text-[10px] hidden sm:block">Sign Out</span>
        </button>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────
   Sample Contractor Data
   ───────────────────────────────────────────── */
const CONTRACTORS = [
  {
    name: "Apex Roofing & Waterproofing",
    license: "B-1002452",
    cslbStatus: "Active",
    yearsExp: 22,
    rating: 4.9,
    reviewCount: 187,
    location: "Anaheim, CA",
    phone: "(714) 555-0142",
    specialties: ["Tile & Shingle", "Flat Roofs", "Waterproofing"],
    verified: true,
    guardianScore: 96,
    insurance: "Active — $2M GL",
    redFlags: 0,
    description:
      "Family-owned since 2002. Specializes in residential re-roofing and commercial flat roof systems. All work backed by a 15-year workmanship warranty.",
  },
  {
    name: "Pacific Crest Roofing Co.",
    license: "C-39 #987234",
    cslbStatus: "Active",
    yearsExp: 14,
    rating: 4.7,
    reviewCount: 124,
    location: "Irvine, CA",
    phone: "(949) 555-0198",
    specialties: ["Asphalt Shingles", "Metal Roofing", "Skylights"],
    verified: true,
    guardianScore: 91,
    insurance: "Active — $1M GL",
    redFlags: 0,
    description:
      "Certified installer for GAF and Owens Corning. Full-service roofing with free inspections and transparent pricing. BBB A+ rated.",
  },
  {
    name: "Golden State Roof Systems",
    license: "B-1003891",
    cslbStatus: "Active",
    yearsExp: 18,
    rating: 4.8,
    reviewCount: 203,
    location: "Santa Fe Springs, CA",
    phone: "(562) 555-0276",
    specialties: ["Solar Tiles", "Cool Roofs", "Repair"],
    verified: true,
    guardianScore: 93,
    insurance: "Active — $2M GL",
    redFlags: 0,
    description:
      "Energy-efficient roofing specialist. Certified Tesla Solar Roof installer. Helps homeowners qualify for California energy rebates.",
  },
];

/* ─────────────────────────────────────────────
   Contractor Profile Card
   ───────────────────────────────────────────── */
function ContractorCard({
  contractor,
  index,
}: {
  contractor: (typeof CONTRACTORS)[0];
  index: number;
}) {
  const c = contractor;
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="guardian-card rounded-2xl overflow-hidden"
    >
      {/* Top bar — Shield-Verified + Member Only */}
      <div className="flex items-center justify-between px-5 py-3 bg-[rgba(59,183,158,0.08)] border-b border-[rgba(59,183,158,0.12)]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#3BB79E]" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3BB79E]">
              Shield-Verified
            </span>
          </div>
          {/* Member Only Badge */}
          <div className="flex items-center gap-1 bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.2)] rounded-md px-2 py-0.5">
            <UserCheck className="w-3 h-3 text-[#C9A84C]" />
            <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#C9A84C]">
              Member Only
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[rgba(59,183,158,0.15)] rounded-md px-2.5 py-1">
          <TrendingUp className="w-3 h-3 text-[#3BB79E]" />
          <span className="text-[11px] font-bold text-[#3BB79E]">
            {c.guardianScore}/100
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 sm:p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight mb-1">
              {c.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[rgba(255,255,255,0.4)]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {c.location}
              </span>
              <span className="text-[rgba(255,255,255,0.1)]">|</span>
              <span>{c.yearsExp} yrs exp</span>
              <span className="text-[rgba(255,255,255,0.1)]">|</span>
              <span>License {c.license}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.05)] rounded-lg px-2.5 py-1.5">
            <Star className="w-3.5 h-3.5 text-[#C9A84C] fill-[#C9A84C]" />
            <span className="text-white font-bold text-sm">{c.rating}</span>
            <span className="text-[rgba(255,255,255,0.3)] text-[10px]">({c.reviewCount})</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[12px] text-[rgba(255,255,255,0.45)] leading-relaxed mb-4">
          {c.description}
        </p>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4">
          {c.specialties.map((spec) => (
            <span
              key={spec}
              className="text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md bg-[rgba(59,183,158,0.08)] border border-[rgba(59,183,158,0.12)] text-[rgba(255,255,255,0.5)]"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Verification checks */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#3BB79E] shrink-0" />
            <span className="text-[rgba(255,255,255,0.55)]">CSLB: {c.cslbStatus}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#3BB79E] shrink-0" />
            <span className="text-[rgba(255,255,255,0.55)]">{c.insurance}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#3BB79E] shrink-0" />
            <span className="text-[rgba(255,255,255,0.55)]">
              <span className="text-[#3BB79E] font-semibold">0 Red Flags</span> found
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <Award className="w-3.5 h-3.5 text-[#C9A84C] shrink-0" />
            <span className="text-[rgba(255,255,255,0.55)]">Guardian Approved</span>
          </div>
        </div>

        {/* Action row */}
        <div className="flex items-center gap-3 pt-3 border-t border-[rgba(255,255,255,0.05)]">
          <button className="flex-1 guardian-cta py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5">
            <Search className="w-3.5 h-3.5" />
            <span>View Full Profile</span>
          </button>
          <button className="flex items-center gap-1.5 text-[11px] text-[rgba(255,255,255,0.4)] hover:text-[#3BB79E] transition-colors px-3 py-2.5 rounded-lg bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(59,183,158,0.08)]">
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Call</span>
          </button>
          <button className="flex items-center gap-1.5 text-[11px] text-[rgba(255,255,255,0.4)] hover:text-[#3BB79E] transition-colors px-3 py-2.5 rounded-lg bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(59,183,158,0.08)]">
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Website</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   /dashboard/roofing — Shield-Verified Pros
   ───────────────────────────────────────────── */
export default function RoofingPage() {
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
            opacity: 0.1,
          }}
        />
        <div className="fixed inset-0 hex-pattern" />

        {/* Ambient glows */}
        <div className="guardian-glow w-[500px] h-[500px] bg-[rgba(59,183,158,0.06)] top-[-100px] left-[-100px]" />
        <div className="guardian-glow w-[600px] h-[600px] bg-[rgba(0,45,114,0.4)] bottom-[-200px] right-[-150px]" />
        <div className="scan-line" />

        {/* ─── Content wrapper ─── */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <DashboardHeader />

          {/* ─── MAIN CONTENT ─── */}
          <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
            <div className="max-w-3xl mx-auto">
              {/* Page header */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                {/* Category breadcrumb */}
                <div className="flex items-center gap-2 mb-4">
                  <Link
                    href="/dashboard"
                    className="text-[11px] text-[rgba(255,255,255,0.35)] hover:text-[#3BB79E] transition-colors"
                  >
                    Dashboard
                  </Link>
                  <ChevronRight className="w-3 h-3 text-[rgba(255,255,255,0.15)]" />
                  <span className="text-[11px] text-[#3BB79E] font-semibold tracking-wide">
                    Roofing Contractors
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight flex items-center gap-3">
                  <Search className="w-7 h-7 text-[#3BB79E]" />
                  Roofing — Shield-Verified Pros
                </h1>
                <p className="text-sm text-[rgba(255,255,255,0.45)] max-w-lg">
                  {CONTRACTORS.length} contractors verified by the Guardian. Every profile has been
                  audited for active CSLB license, valid insurance, and zero Red Flags.
                </p>
              </motion.div>

              {/* Member Only results banner */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="flex items-center gap-2.5 bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.12)] rounded-xl px-4 py-3 mb-6"
              >
                <UserCheck className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <p className="text-[11px] text-[rgba(255,255,255,0.5)]">
                  <span className="text-[#C9A84C] font-semibold">Member Only Results</span> — This
                  audited list is exclusive to verified Guardian members. These profiles are not
                  available to the public.
                </p>
              </motion.div>

              {/* Results summary bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex flex-wrap items-center gap-3 mb-6"
              >
                <div className="flex items-center gap-2 text-[11px] text-[rgba(255,255,255,0.4)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3BB79E]" />
                  <span>
                    <strong className="text-white">{CONTRACTORS.length}</strong> results
                  </span>
                </div>
                <div className="h-3 w-px bg-[rgba(255,255,255,0.08)]" />
                <div className="flex items-center gap-2 text-[11px] text-[rgba(255,255,255,0.4)]">
                  <Clock className="w-3.5 h-3.5 text-[rgba(255,255,255,0.3)]" />
                  <span>Last verified: Today</span>
                </div>
                <div className="h-3 w-px bg-[rgba(255,255,255,0.08)]" />
                <div className="flex items-center gap-2 text-[11px] text-[rgba(255,255,255,0.4)]">
                  <span>
                    <strong className="text-[#3BB79E]">0 Red Flags</strong> across all profiles
                  </span>
                </div>
              </motion.div>

              {/* Contractor cards */}
              <div className="space-y-5">
                {CONTRACTORS.map((contractor, i) => (
                  <ContractorCard key={contractor.license} contractor={contractor} index={i} />
                ))}
              </div>

              {/* CTA to try Audit */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-10 guardian-card rounded-2xl p-6 sm:p-8 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.15)] flex items-center justify-center">
                    <AlertTriangle className="w-7 h-7 text-[#C9A84C]" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Have a bid from a different contractor?
                </h3>
                <p className="text-sm text-[rgba(255,255,255,0.4)] mb-5 max-w-md mx-auto">
                  Upload their contract for a professional Risk Audit. Our Guardians will check for
                  Red Flags, insurance gaps, and compliance issues.
                </p>
                <Link
                  href="/ask-the-guardian"
                  className="inline-flex items-center gap-2 guardian-cta px-8 py-3.5 rounded-xl text-sm"
                >
                  <Search className="w-4 h-4" />
                  <span>Audit a Bid</span>
                </Link>
              </motion.div>
            </div>
          </main>

          {/* ─── FOOTER ─── */}
          <footer className="relative z-10 px-4 sm:px-6 lg:px-10 py-6 border-t border-[rgba(255,255,255,0.05)] mt-auto">
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
    </AuthGuard>
  );
}
