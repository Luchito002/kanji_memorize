import { useRef, useState, useLayoutEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { validateStroke } from "@/services/apiKanjiMatch";
import { StrokeInput, StrokeValidationResult } from "@/models/kanji_match.model";
import { ApiResponse } from "@/types/api_response";
import "./kanjiCanvas.css";
import { useRememberKanji } from "@/context/RememberKanjiContext";

export function useKanjiCanvas(
  targetKanji: string,
  canvasWidth = 300,      // tamaño CSS deseado
  canvasHeight = 300,     // tamaño CSS deseado
  isComplete: boolean,
  setIsComplete: (value: boolean) => void
) {
  const { writeTimeSec, setWriteTimeSec, strokeErrors, setStrokeErrors } = useRememberKanji();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);

  const [strokes, setStrokes] = useState<number[][][]>([]);
  const [currentStroke, setCurrentStroke] = useState<number[][]>([]);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const { fetch } = useApi<ApiResponse<StrokeValidationResult>, StrokeInput>(validateStroke);

  const isDarkMode = () => document.documentElement.classList.contains("dark");

  /**
   * Ajuste por devicePixelRatio (DPR) para nitidez y coordenadas correctas.
   * Mantiene el espacio de dibujo en "coordenadas CSS" aunque el buffer sea mayor.
   */
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;

    // Buffer real (físico)
    canvas.width = Math.round(canvasWidth * dpr);
    canvas.height = Math.round(canvasHeight * dpr);

    // Tamaño visual CSS
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    // Normaliza sistema de coord a CSS space
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Estilos base
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = isDarkMode() ? "#D4D4D4" : "#000";
    ctx.lineWidth = 4;

    // Redibuja si ya había trazos
    redrawCanvas(strokes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasWidth, canvasHeight]);

  /** Devuelve coordenadas en espacio CSS, compensando el DPR mediante rect & width/height */
  const getPos = (e: React.PointerEvent): [number, number] => {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / (window.devicePixelRatio || 1) / rect.width;
    const scaleY = canvas.height / (window.devicePixelRatio || 1) / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    return [x, y];
  };

  /** Escala puntos devueltos por backend (109x109) al tamaño CSS del canvas */
  const scaleStrokeToCanvas = (points: number[][]): number[][] => {
    const scaleX = canvasWidth / 109;
    const scaleY = canvasHeight / 109;
    return points.map(([x, y]) => [x * scaleX, y * scaleY]);
  };

  const getCtx = () => canvasRef.current?.getContext("2d") ?? null;

  const redrawCanvas = (allStrokes: number[][][]) => {
    const ctx = getCtx();
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

  const startDrawing = (e: React.PointerEvent) => {
    if (isComplete) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    if (!startTime) setStartTime(Date.now());
    const [x, y] = getPos(e);
    setCurrentStroke([[x, y]]);
    drawingRef.current = true;
  };

  const draw = (e: React.PointerEvent) => {
    if (!drawingRef.current || isComplete) return;
    const [x, y] = getPos(e);
    setCurrentStroke((prev) => {
      const newStroke = [...prev, [x, y]];
      redrawCanvas([...strokes, newStroke]);
      return newStroke;
    });
  };

  const animateErase = (stroke: number[][]) => {
    const ctx = getCtx();
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
      if (alpha > 0) requestAnimationFrame(fade);
    };
    fade();
  };

  const shakeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.classList.add("shake");
    setTimeout(() => canvas.classList.remove("shake"), 300);
  };

  const endDrawing = async (e?: React.PointerEvent) => {
    if (e) (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
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
      setStrokes((prev) => {
        const updated = [...prev, scaled];
        redrawCanvas(updated);
        return updated;
      });
      setCurrentStrokeIndex((prev) => prev + 1);
      if (data.done) {
        setIsComplete(true);
        if (startTime) setWriteTimeSec((Date.now() - startTime) / 1000);
      }
    } else {
      animateErase(currentStroke);
      shakeCanvas();
      setStrokeErrors(prev => (prev ?? 0) + 1);

    }

    setCurrentStroke([]);
  };

  const clearCanvas = () => {
    setStrokes([]);
    setCurrentStroke([]);
    setCurrentStrokeIndex(0);
    setIsComplete(false);
    setStrokeErrors(0);
    setWriteTimeSec(0);
    const ctx = getCtx();
    if (ctx) ctx.clearRect(0, 0, canvasWidth, canvasHeight);
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
        const [sx, sy] = stroke[0];
        const [ex, ey] = stroke[stroke.length - 1];
        return [sx, sy, ex, ey];
      });
  };

  return {
    canvasRef,
    startDrawing,
    draw,
    endDrawing,
    clearCanvas,
    undoLastStroke,
    getLinesForBackend,
    strokeErrors,
    writeTimeSec,
  };
}
