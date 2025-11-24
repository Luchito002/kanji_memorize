import { useEffect } from "react";
import { Radical } from "@/types/kanji";
import { useModalContext } from "./Modal/context/UseModalContext";

interface RadicalExplanationProps {
  explanation: string,
  radicals: Radical[]
}

export default function RadicalExplanation({ explanation, radicals }: RadicalExplanationProps) {
  const { setState } = useModalContext()

  useEffect(() => {
    setState(true)
  }, [setState])

  return (
    <div className="sm:px-52 px-0" >
      <div className="relative items-center justify-center p-8 bg-background gap-4">
        <span className="absolute top-4 left-4 text-primary text-xl" >※</span>

        {/* meanings */}
        <div className="flex flex-wrap justify-center gap-2">
          {radicals.map((r, i) => (
            <span key={i} className="px-2 py-1 rounded bg-muted text-sm">
              {r.meaning}
            </span>
          ))}
        </div>

        {/* chars */}
        <div className="flex flex-wrap justify-center gap-2 text-2xl">
          {radicals.map((r, i) => (
            <span key={i}>{r.char}</span>
          ))}
        </div>

        <p className="text-center">{explanation}</p>
      </div>
    </div>
  )
}
