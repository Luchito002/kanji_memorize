import { useKanjiCanvas } from "@/hooks/useKanjiCanvas";
import { CheckCircle2 } from "lucide-react";

interface Props {
  onMatchRequest?: (lines: number[][]) => Promise<void>;
  kanjiCharac: string;
}

export default function KanjiCanvas({ kanjiCharac }: Props) {
  const {
    canvasRef,
    isComplete,
    startDrawing,
    draw,
    endDrawing,
  } = useKanjiCanvas(kanjiCharac);

  return (
    <div className="relative w-[300px] h-[300px]">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="border border-border touch-none bg-card"
        onMouseDown={(e) => startDrawing(e)}
        onMouseMove={(e) => draw(e)}
        onMouseUp={() => endDrawing()}
        onMouseLeave={() => endDrawing()}
        onTouchStart={(e) => startDrawing(e)}
        onTouchMove={(e) => draw(e)}
        onTouchEnd={() => endDrawing()}
      />
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-border" />
        <div className="absolute top-0 left-1/2 h-full border-l border-dashed border-border" />
      </div>

      {isComplete && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 animate-fade-in">
          <CheckCircle2 className="text-green-500 w-16 h-16 animate-scale-up" />
        </div>
      )}
    </div>
  );
}
