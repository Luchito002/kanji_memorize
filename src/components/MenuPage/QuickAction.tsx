import { Link } from "react-router-dom";

interface Props {
  icon: string,
  label: string,
  to: string
}

export default function QuickAction({ icon, label, to }: Props) {
  return (
    <Link to={to} className="flex flex-col items-center justify-center bg-card text-card-foreground dark:bg-card dark:text-card-foreground p-4 rounded-xl shadow hover:shadow-lg hover:bg-popover transition-all cursor-pointer">
      <span className="text-3xl">{icon}</span>
      <span className="mt-2 text-sm">{label}</span>
    </Link>
  );
}
