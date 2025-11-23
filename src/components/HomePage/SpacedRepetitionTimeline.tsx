export type Segment = {
  top: string;
  bottom: string;
  width: number;
  color: string;
};

interface TimelineProps {
  segments?: Segment[];
  height?: number; // px
  arcHeightRatio?: number;
  backgroundClassName?: string;
}

const defaultSegments: Segment[] = [
  { top: "1 día", bottom: "1ª vez", width: 0.2, color: "bg-green-700" },
  { top: "3 días", bottom: "2ª vez", width: 0.35, color: "bg-orange-700" },
  { top: "1 semana", bottom: "3ª vez", width: 0.45, color: "bg-red-700" },
];

function buildArcPath(x0: number, x1: number, y: number, arcHeight: number) {
  const xm = (x0 + x1) / 2;
  const h = arcHeight;
  return [
    `M ${x0},${y}`,
    `C ${x0 + (x1 - x0) * 0.25},${y - h} ${xm - (x1 - x0) * 0.1},${y - h} ${xm},${y - h * 0.95}`,
    `C ${xm + (x1 - x0) * 0.1},${y - h} ${x1 - (x1 - x0) * 0.25},${y - h} ${x1},${y}`,
  ].join(" ");
}

export default function SpacedRepetitionTimeline({
  segments = defaultSegments,
  height = 220,
  arcHeightRatio = 0.7,
  backgroundClassName = "bg-neutral-900",
}: TimelineProps) {
  const W = 1000;
  const barY = height * 0.45; // posición vertical de la barra
  const barH = Math.max(20, height * 0.13); // alto de la barra

  const xs: number[] = [0];
  segments.reduce((acc, s) => {
    const next = acc + s.width * W;
    xs.push(next);
    return next;
  }, 0);

  const arcYs = barY; // línea base

  return (
    <div className={`${backgroundClassName} text-white w-full rounded-2xl p-6 shadow-xl`}>
      <div className="mx-auto max-w-5xl">
        <div className="text-xs md:text-sm opacity-80 mb-3">React + TS + Tailwind • SVG</div>
        <div
          className="relative w-full"
          style={{ height }}
        >
          {/* Etiquetas superiores */}
          {segments.map((s, i) => {
            const x0 = xs[i];
            const x1 = xs[i + 1];
            const cx = (x0 + x1) / 2;
            return (
              <div
                key={`top-${i}`}
                className="absolute -translate-x-1/2 text-lg md:text-2xl font-semibold"
                style={{ left: `${(cx / W) * 100}%`, top: 2 }}
              >
                {s.top}
              </div>
            );
          })}

          {/* SVG con curvas y barra */}
          <svg viewBox={`0 0 ${W} ${height}`} className="absolute inset-0 w-full h-full">
            {/* Barra segmentada */}
            {segments.map((s, i) => {
              const x0 = xs[i];
              const x1 = xs[i + 1];
              return (
                <rect
                  key={`seg-${i}`}
                  x={x0}
                  y={barY - barH / 2}
                  width={x1 - x0}
                  height={barH}
                  className={`${s.color} stroke-neutral-800`} // tenue borde
                  strokeWidth={1}
                  rx={4}
                />
              );
            })}

            {/* Curvas */}
            {segments.map((_, i) => {
              const x0 = xs[i];
              const x1 = xs[i + 1];
              const arcHeight = (x1 - x0) * 0.25 * arcHeightRatio; // proporcional al ancho
              const d = buildArcPath(x0 + 2, x1 - 2, arcYs - barH / 2 - 2, arcHeight);
              return (
                <path
                  key={`arc-${i}`}
                  d={d}
                  fill="none"
                  stroke="white"
                  strokeWidth={3}
                  strokeLinecap="round"
                  opacity={0.95}
                />
              );
            })}
          </svg>

          {/* Etiquetas inferiores */}
          {segments.map((s, i) => {
            const x0 = xs[i];
            const x1 = xs[i + 1];
            const cx = (x0 + x1) / 2;
            return (
              <div
                key={`bottom-${i}`}
                className="absolute -translate-x-1/2 text-lg md:text-2xl font-semibold"
                style={{ left: `${(cx / W) * 100}%`, bottom: 0 }}
              >
                {s.bottom}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
