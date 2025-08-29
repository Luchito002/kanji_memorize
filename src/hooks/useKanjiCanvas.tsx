import { useRef, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { validateStroke } from "@/services/apiKanjiMatch";
import { StrokeInput, StrokeValidationResult } from "@/models/kanji_match.model";
import { ApiResponse } from "@/types/api_response";
import "./kanjiCanvas.css"

export function useKanjiCanvas(targetKanji: string, canvasWidth = 300, canvasHeight = 300) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const [isComplete, setIsComplete] = useState(false);
  const [strokes, setStrokes] = useState<number[][][]>([]);
  const [currentStroke, setCurrentStroke] = useState<number[][]>([]);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);
  const { fetch } = useApi<ApiResponse<StrokeValidationResult>, StrokeInput>(validateStroke);

  const isDarkMode = () => {
    return document.documentElement.classList.contains("dark");
  };

  const getPos = (e: React.MouseEvent | React.TouchEvent): [number, number] => {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e && e.touches.length > 0) {
      const touch = e.touches[0];
      return [touch.clientX - rect.left, touch.clientY - rect.top];
    } else if ("clientX" in e) {
      return [e.clientX - rect.left, e.clientY - rect.top];
    }

    return [0, 0];
  };

  const scaleStrokeToCanvas = (points: number[][]): number[][] => {
    const scaleX = canvasWidth / 109;
    const scaleY = canvasHeight / 109;
    return points.map(([x, y]) => [x * scaleX, y * scaleY]);
  };

  const redrawCanvas = (allStrokes: number[][][]) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = isDarkMode() ? "#D4D4D4" : "#000";
    ctx.lineWidth = 4;

    for (const stroke of allStrokes) {
      if (stroke.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(stroke[0][0], stroke[0][1]);
      for (let i = 1; i < stroke.length - 1; i++) {
        const midX = (stroke[i][0] + stroke[i + 1][0]) / 2;
        const midY = (stroke[i][1] + stroke[i + 1][1]) / 2;
        ctx.quadraticCurveTo(stroke[i][0], stroke[i][1], midX, midY);
      }
      ctx.lineTo(stroke[stroke.length - 1][0], stroke[stroke.length - 1][1]);
      ctx.stroke();
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (isComplete) return;
    const [x, y] = getPos(e);
    setCurrentStroke([[x, y]]);
    drawingRef.current = true;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawingRef.current || isComplete) return;
    const [x, y] = getPos(e);
    setCurrentStroke((prev) => {
      const newStroke = [...prev, [x, y]];
      redrawCanvas([...strokes, newStroke]);
      return newStroke;
    });
  };

  const animateErase = (stroke: number[][]) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    let alpha = 1.0;

    const fade = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      redrawCanvas(strokes);

      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 4;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      if (stroke.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(stroke[0][0], stroke[0][1]);
        for (let i = 1; i < stroke.length - 1; i++) {
          const midX = (stroke[i][0] + stroke[i + 1][0]) / 2;
          const midY = (stroke[i][1] + stroke[i + 1][1]) / 2;
          ctx.quadraticCurveTo(stroke[i][0], stroke[i][1], midX, midY);
        }
        ctx.lineTo(stroke[stroke.length - 1][0], stroke[stroke.length - 1][1]);
        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;
      alpha -= 0.1;
      if (alpha > 0) {
        requestAnimationFrame(fade);
      }
    };

    fade();
  };

  const shakeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.classList.add("shake");
    setTimeout(() => canvas.classList.remove("shake"), 300);
  };

  const endDrawing = async () => {
    drawingRef.current = false;

    if (currentStroke.length < 2) {
      setCurrentStroke([]);
      return;
    }

    const [x1, y1] = currentStroke[0];
    const [x2, y2] = currentStroke[currentStroke.length - 1];
    const line: [number, number, number, number] = [x1, y1, x2, y2];

    const res = await fetch({
      kanji: targetKanji,
      stroke_index: currentStrokeIndex,
      user_line: line,
    });

    if (res.result?.ok) {
      const data = res.result;
      const scaled = scaleStrokeToCanvas(data.corrected);
      setStrokes((prev) => [...prev, scaled]);
      redrawCanvas([...strokes, scaled]);
      setCurrentStrokeIndex((prev) => prev + 1);
      if (data.done) {
        setIsComplete(true);
      }
    } else {
      animateErase(currentStroke);
      shakeCanvas();
    }

    setCurrentStroke([]);
  };

  const clearCanvas = () => {
    setStrokes([]);
    setCurrentStroke([]);
    setCurrentStrokeIndex(0);
    setIsComplete(false);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
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

  const getLinesForBackend = (): number[][] => {
    return strokes
      .filter((s) => s.length >= 2)
      .map((stroke) => {
        const [x1, y1] = stroke[0];
        const [x2, y2] = stroke[stroke.length - 1];
        return [x1, y1, x2, y2];
      });
  };

  return {
    canvasRef,
    startDrawing,
    draw,
    endDrawing,
    isComplete,
    clearCanvas,
    undoLastStroke,
    getLinesForBackend,
  };
}
