export default function KanjiAmbicionDiagram() {
  return (
    <div className="w-full bg-gray-900 text-white py-8 px-5 sm:px-8 rounded-2xl shadow-2xl">
      {/* Título principal opcional */}
      <div className="sr-only">Ambición (望) — diagrama mnemotécnico</div>

      {/* Lienzo principal: usamos grid para ordenar el SVG y el texto inferior */}
      <div className="mx-auto max-w-4xl">
        {/* Encabezado visual */}
        <div className="relative">
          {/* SVG: todo el arte está vectorizado para que sea nítido en cualquier tamaño */}
          <svg
            viewBox="0 0 1200 700"
            className="w-full h-auto"
            role="img"
            aria-labelledby="title desc"
          >
            <title id="title">Diagrama del kanji 望 (Ambición)</title>
            <desc id="desc">
              El carácter 望 al centro con flechas y etiquetas que indican sus
              componentes: luna, rey y fallecer.
            </desc>

            {/* Fondo decorativo sutil */}
            <rect x="0" y="0" width="1200" height="700" rx="32" fill="transparent" />

            {/* Palabra AMBICIÓN */}
            <text
              x="600"
              y="480"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, sans-serif"
              fontWeight={800}
              fontSize="84"
              letterSpacing="4"
              fill="#ffffff"
            >
              AMBICIÓN
            </text>

            {/* Kanji central 望 */}
            <text
              x="600"
              y="340"
              textAnchor="middle"
              fontFamily="'Noto Serif JP', 'Noto Sans JP', serif"
              fontSize="280"
              fill="#ffffff"
            >
              望
            </text>

            {/* Etiquetas: Luna, Rey, Fallecer */}
            <text x="1010" y="160" fontSize="64" fill="#ffffff">月</text>
            <text x="1035" y="220" fontSize="36" fill="#ffffff">Luna</text>

            <text x="1020" y="430" fontSize="64" fill="#ffffff">王</text>
            <text x="1040" y="490" fontSize="36" fill="#ffffff">Rey</text>

            <text x="50" y="170" fontSize="64" fill="#ffffff">亡</text>
            <text x="50" y="230" fontSize="36" fill="#ffffff">Fallecer</text>

            {/* Flechas hacia 望 */}
            {/* Flecha desde 月 */}
            <path
              d="M980 150 C 900 170, 820 200, 740 210"
              fill="none"
              stroke="#ffffff"
              strokeWidth="6"
            />
            <polygon points="740,210 756,218 752,198" fill="#ffffff" />

            {/* Flecha desde 王 */}
            <path
              d="M980 430 C 900 410, 780 400, 720 380"
              fill="none"
              stroke="#7ed957"
              strokeWidth="6"
            />
            <polygon points="720,380 736,390 732,368" fill="#7ed957" />

            {/* Flecha desde 亡 */}
            <path
              d="M180 160 C 300 170, 420 200, 520 210"
              fill="none"
              stroke="#ff915a"
              strokeWidth="6"
            />
            <polygon points="520,210 504,218 508,198" fill="#ff915a" />
          </svg>
        </div>

        {/* Frase inferior */}
        <p className="mt-6 text-center text-lg sm:text-xl leading-8 text-gray-100">
          Un <span className="text-green-400 font-semibold">rey (王)</span> miraba la
          <span className="text-blue-400 font-semibold"> luna (月)</span> con
          <span className="font-extrabold text-white"> ambición (望)</span>, deseando alcanzar lo imposible,
          pero <span className="text-orange-300 font-semibold">falleció (亡)</span> antes de lograrlo.
        </p>
      </div>
    </div>
  );
}
