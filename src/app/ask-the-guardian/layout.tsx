import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask the Guardian — Professional Bid Audit",
  description:
    "Upload your contractor's bid or contract for an AI-powered Red Flag scan. Get your Risk Report within 24 hours.",
};

export default function AskTheGuardianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
