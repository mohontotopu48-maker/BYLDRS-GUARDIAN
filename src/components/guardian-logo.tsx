import Link from "next/link";
import Image from "next/image";

export function GuardianLogo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 group">
      <Image
        src="/guardian-logo.png"
        alt="BYLDRS GUARDIAN"
        width={44}
        height={44}
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-contain"
        priority
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
