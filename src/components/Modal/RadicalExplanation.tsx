import { useEffect } from "react";
import { useModalContext } from "./Modal/context/UseModalContext";
import { Button } from "./ui/button";
import { Radical } from "@/types/kanji";

interface RadicalExplanationProps {
  explanation: string,
  radicals: Radical[]
}

export default function RadicalExplanation({ explanation, radicals }: RadicalExplanationProps) {
  const { setState } = useModalContext()

  useEffect(() => {
    setState(true)
  }, [setState])

  const handleClick = () => {
    setState(false)
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-background w-96 gap-4">
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

      <Button onClick={handleClick}>Entendido!</Button>
    </div>
  )
}
