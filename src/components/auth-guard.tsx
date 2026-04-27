"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useMemberStore } from "@/lib/store/member-store";
import { Shield, Lock, ChevronRight } from "lucide-react";

/**
 * AuthGuard — Wraps protected pages.
 * If the user is NOT a Verified Member, redirects to /join.
 * Shows a brief loading state while checking session.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isVerified = useMemberStore((s) => s.isVerified);
  const [isChecking, setIsChecking] = useState(true);
  const [showRedirect, setShowRedirect] = useState(false);

  useEffect(() => {
    // Small delay to allow Zustand persist middleware to hydrate from localStorage
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isChecking && !isVerified) {
      // Show redirect message briefly before redirecting
      const showTimer = setTimeout(() => {
        setShowRedirect(true);
        const redirectTimer = setTimeout(() => {
          router.push("/");
        }, 1500);
        return () => clearTimeout(redirectTimer);
      }, 200);
      return () => clearTimeout(showTimer);
    }
  }, [isChecking, isVerified, router]);

  // Still hydrating from localStorage
  if (isChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#002D72]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[rgba(59,183,158,0.1)] border border-[rgba(59,183,158,0.2)] flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-[#3BB79E] animate-pulse" />
          </div>
          <p className="text-sm text-[rgba(255,255,255,0.5)]">
            Verifying your Shield...
          </p>
        </motion.div>
      </div>
    );
  }

  // Not verified — show redirect message
  if (!isVerified) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#002D72]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="guardian-card rounded-2xl p-8 sm:p-10 max-w-sm text-center"
        >
          <div className="w-16 h-16 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center mx-auto mb-5">
            <Lock className="w-8 h-8 text-[#C9A84C]" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Members Only
          </h2>
          <p className="text-sm text-[rgba(255,255,255,0.45)] mb-6 leading-relaxed">
            This area is exclusively for verified Guardian members. You&apos;ll
            need to enter your invitation passcode to continue.
          </p>
          {showRedirect && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 text-[#3BB79E] text-sm font-semibold"
            >
              <span>Redirecting to login...</span>
              <ChevronRight className="w-4 h-4 animate-pulse" />
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // Verified — render children
  return <>{children}</>;
}
