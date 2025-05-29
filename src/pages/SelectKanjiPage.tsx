import KanjiContainer from "@/components/KanjiContainer";
import allKanji from "../../public/allKanji.json";
import { Kanji } from "@/types/kanji";
import { getRandomKanji } from "@/utilities/getRandomKanji.utility";
import { useEffect, useState } from "react";
import KanjiMeanings from "@/components/KanjiMeanings";
import { Button } from "@/components/ui/button";
import ConfettiAnimation from "@/components/Modal/ConfettiAnimation";

export default function SelectKanjiPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)

  const [target, setTarget] = useState<Kanji>({
    character: "",
    radicals: [],
    meanings: [],
    examples: [],
    story: "",
    kanjiImages: {
      kanjiStrokeOrder: "",
      kanjiEasyRemember: "",
    },
  });

  useEffect(() => {
    const kanjis: Kanji[] = allKanji;
    setTarget(kanjis[10]);
  }, []);

  const handleSelectKanji = (value: string) => {
    setSelected(value)
    const isCorrect = value === target.character
    setMessage(isCorrect ? "¡Correcto!" : "Incorrecto... inténtalo otra vez")
    setShowConfetti(isCorrect)
  }

  const options = getRandomKanji(allKanji, target.character, 4);

  return (
    <KanjiContainer>
      <KanjiMeanings meanings={target.meanings} />
      <h2 className="text-lg">Selecciona el Kanji correcto</h2>

      <div className="flex flex-wrap justify-center gap-4">
        {options.map((option, index) => (
          <span
            key={index}
            onClick={() => handleSelectKanji(option)}
            className={`cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-xl shadow-md text-2xl transition-all duration-200 hover:bg-blue-700 active:scale-95 ${selected === option
              ? option === target.character
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
      {showConfetti && <ConfettiAnimation />}
    </KanjiContainer>
  )
}
