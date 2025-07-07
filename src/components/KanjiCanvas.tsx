import React, { useRef, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { validateStroke } from "@/services/apiKanjiMatch";
import { ApiResponse } from "@/types/api_response";
import { StrokeInput, StrokeValidationResult } from "@/models/kanji_match.model";

interface Props {
  onMatchRequest: (lines: number[][]) => Promise<void>;
}

export default function KanjiCanvas({ onMatchRequest }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokes, setStrokes] = useState<number[][][]>([]);
  const [currentStroke, setCurrentStroke] = useState<number[][]>([]);
  const [drawing, setDrawing] = useState(false);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);
  const [targetKanji, setTargetKanji] = useState("心");

  const { fetch } = useApi<ApiResponse<StrokeValidationResult>, StrokeInput>(validateStroke);

  const getPos = (e: MouseEvent | TouchEvent): [number, number] => {
    const rect = canvasRef.current!.getBoundingClientRect();
    if ("touches" in e && e.touches.length > 0) {
      const touch = e.touches[0];
      return [touch.clientX - rect.left, touch.clientY - rect.top];
    } else if ("clientX" in e) {
      return [e.clientX - rect.left, e.clientY - rect.top];
    }
    return [0, 0];
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const [x, y] = getPos(e.nativeEvent);
    setCurrentStroke([[x, y]]);
    setDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const [x, y] = getPos(e.nativeEvent);
    setCurrentStroke((prev) => {
      const newStroke = [...prev, [x, y]];
      const ctx = canvasRef.current!.getContext("2d");
      if (ctx && prev.length > 0) {
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 4;
        ctx.beginPath();
        const [prevX, prevY] = prev[prev.length - 1];
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      return newStroke;
    });
  };

  const endDrawing = async () => {
    if (currentStroke.length < 2) {
      setCurrentStroke([]);
      setDrawing(false);
      return;
    }

    const [x1, y1] = currentStroke[0];
    const [x2, y2] = currentStroke[currentStroke.length - 1];
    const line: [number, number, number, number] = [x1, y1, x2, y2];


    console.log({
      kanji: targetKanji,
      stroke_index: currentStrokeIndex,
      user_line: line,
    })
    try {
      const res = await fetch({
        kanji: targetKanji,
        stroke_index: currentStrokeIndex,
        user_line: line,
      });

      if (res.result?.ok) {
        const data = res.result;

        // Mostrar corrección si existe
        const corrected = data.corrected;
        const stroke = [
          [corrected[0], corrected[1]],
          [corrected[2], corrected[3]],
        ];

        setStrokes((prev) => [...prev, stroke]);
        redrawCanvas([...strokes, stroke]);

        setCurrentStrokeIndex((prev) => prev + 1);

        if (data.done) {
          alert("✅ ¡Kanji completado!");
        }
      } else {
        alert("❌ Error en el trazo");
      }
    } catch (err) {
      console.error("Error al validar el trazo:", err);
    }

    setCurrentStroke([]);
    setDrawing(false);
  };

  const clearCanvas = () => {
    setStrokes([]);
    setCurrentStroke([]);
    setCurrentStrokeIndex(0);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    }
  };

  const redrawCanvas = (allStrokes: number[][][]) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;

    for (const stroke of allStrokes) {
      if (stroke.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(stroke[0][0], stroke[0][1]);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i][0], stroke[i][1]);
      }
      ctx.stroke();
    }
  };

  const undoLastStroke = () => {
    if (currentStrokeIndex === 0) return;
    setStrokes((prev) => {
      const updated = prev.slice(0, -1);
      redrawCanvas(updated);
      return updated;
    });
    setCurrentStrokeIndex((prev) => prev - 1);
  };

  const sendToBackend = async () => {
    const lines: number[][] = strokes
      .filter((s) => s.length >= 2)
      .map((stroke) => {
        const [x1, y1] = stroke[0];
        const [x2, y2] = stroke[stroke.length - 1];
        return [x1, y1, x2, y2];
      });

    await onMatchRequest(lines);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="border border-black touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
      />
      <div className="mt-4 flex gap-2">
        <button onClick={sendToBackend}>Identificar</button>
        <button onClick={clearCanvas}>Borrar</button>
        <button onClick={undoLastStroke}>Deshacer</button>
      </div>
    </div>
  );
}
