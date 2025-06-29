interface Props {
  current: number;
  max: number;
  className?: string;
}

export function Progress({ current, max, className }: Props) {
  const percentage = Math.min(Math.max(((current + 1) / max) * 100, 0), 100);

  return (
    <div
      className={`relative w-full h-4 rounded-full bg-primary/20 overflow-hidden ${className || ""}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={current}
      aria-label="Progreso"
    >
      <div
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
