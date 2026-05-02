import { JSX } from "react";
import { Link } from "react-router-dom";

interface Props {
  icon: JSX.Element;
  label: string;
  to: string;
  subtitle?: string;
  toneClassName?: string;
}

export default function QuickAction({ icon, label, to, subtitle, toneClassName }: Props) {
  return (
    <Link
      to={to}
      className="
        group relative overflow-hidden
        flex flex-col items-center justify-center text-center
        bg-card/90 text-card-foreground dark:bg-card/90
        rounded-3xl border border-border/60
        shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.14)]
        transition-all duration-300 cursor-pointer
        p-6 sm:p-8 md:p-10
        aspect-square
        hover:-translate-y-1
      "
    >
      <div className={`absolute -top-10 -right-10 h-28 w-28 rounded-full blur-2xl opacity-70 ${toneClassName ?? 'bg-primary/30'}`} />
      <div className="absolute inset-0 bg-linear-to-b from-white/25 to-transparent dark:from-white/5" />

      <span className="relative z-10 text-4xl sm:text-5xl md:text-4xl transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <span className="relative z-10 mt-3 text-sm sm:text-base md:text-lg font-semibold">
        {label}
      </span>
      {subtitle && (
        <span className="relative z-10 mt-1 text-xs sm:text-sm text-muted-foreground">
          {subtitle}
        </span>
      )}
    </Link>
  );
}
