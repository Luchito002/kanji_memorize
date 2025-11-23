import { JSX } from "react";
import { Link } from "react-router-dom";

interface Props {
  icon: JSX.Element;
  label: string;
  to: string;
}

export default function QuickAction({ icon, label, to }: Props) {
  return (
    <Link
      to={to}
      className="
        flex flex-col items-center justify-center
        bg-card text-card-foreground dark:bg-card dark:text-card-foreground
        rounded-2xl shadow-md hover:shadow-xl hover:bg-popover
        transition-all cursor-pointer
        p-6 sm:p-8 md:p-10
        aspect-square
      "
    >
      <span className="text-4xl sm:text-5xl md:text-4xl">{icon}</span>
      <span className="mt-3 text-sm sm:text-base md:text-lg font-medium text-center">
        {label}
      </span>
    </Link>
  );
}

