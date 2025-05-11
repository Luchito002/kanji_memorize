import { useState } from "react"
import Lottie from "lottie-react"
import { Button } from "@/components/ui/button"
import confettiAnimation from "../../public/confetti.json"

type Kanji = {
  character: string
  meanings: string[]
}

type Props = {
  kanji: Kanji
  options: string[]
}

export default function SelectKanji({ kanji, options }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSelectKanji = (value: string) => {
    setSelected(value)
    const isCorrect = value === kanji.character
    setMessage(isCorrect ? "¡Correcto!" : "Incorrecto... inténtalo otra vez")
    setShowConfetti(isCorrect)
  }

  return (
    <div className="flex flex-col items-center text-center space-y-6 p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">{kanji.meanings.join(" / ")}</h1>
      <h2 className="text-lg">Selecciona el Kanji correcto</h2>

      <div className="flex flex-wrap justify-center gap-4">
        {options.map((option, index) => (
          <span
            key={index}
            onClick={() => handleSelectKanji(option)}
            className={`cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-xl shadow-md text-2xl transition-all duration-200 hover:bg-blue-700 active:scale-95 ${selected === option
                ? option === kanji.character
                  ? "bg-green-500"
                  : "bg-red-500"
                : ""
              }`}
          >
            {option}
          </span>
        ))}
      </div>

      <Button>Continuar</Button>

      {message && <p className="mt-4 text-xl">{message}</p>}
      {showConfetti && <Lottie animationData={confettiAnimation} />}
    </div>
  )
}
