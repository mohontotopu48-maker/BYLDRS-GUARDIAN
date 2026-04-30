import { ShieldCheck } from "lucide-react";

export function GuardianFooter() {
  return (
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
            <span className="text-[rgba(255,255,255,0.45)]">Santa Fe Springs</span>
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
  );
}
