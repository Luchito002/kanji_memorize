import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useKanjiCanvas } from "@/hooks/useKanjiCanvas";

interface Props {
  kanjiCharac: string;
  isComplete: boolean;
  setIsComplete: (value: boolean) => void;
}

export default function KanjiCanvas({ kanjiCharac, isComplete, setIsComplete }: Props) {
  const {
    canvasRef,
    startDrawing,
    draw,
    endDrawing,
    clearCanvas,
  } = useKanjiCanvas(kanjiCharac, 300, 300, isComplete, setIsComplete);

  useEffect(() => {
    clearCanvas();
  }, [kanjiCharac]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative w-[300px] h-[300px]">
      <canvas
        ref={canvasRef}
        // OJO: width/height definen el tamaño CSS deseado; el hook ajusta el buffer por DPR
        width={300}
        height={300}
        className="border border-border touch-none bg-card select-none"
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={endDrawing}
        onPointerCancel={endDrawing}
      />
      {/* Guías */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-border" />
        <div className="absolute top-0 left-1/2 h-full border-l border-dashed border-border" />
      </div>

      {/* Overlay de completado */}
      {isComplete && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 animate-fade-in">
          <CheckCircle2 className="text-green-500 w-16 h-16 animate-scale-up" />
        </div>
      )}
    </div>
  );
}
