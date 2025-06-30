interface Props {
  min: number;
  max: number;
  current: number;
  className?: string;
}

export function Progress({ min, max, current, className }: Props) {
  const clamped = Math.min(Math.max(current, min), max);
  const percentage = ((clamped - min) / (max - min)) * 100;

  return (
    <div
      className={`relative w-full h-4 rounded-full bg-primary/20 overflow-hidden ${className || ""}`}
      role="progressbar"
      aria-valuemin={min}
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
