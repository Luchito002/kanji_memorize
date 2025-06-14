import allKanji from "../../public/allKanji.json";
import { radicals as allRadicals } from "@/types/radicals"
import KanjiContainer from "@/components/KanjiContainer";
import KanjiMeanings from "@/components/KanjiMeanings";
import { Kanji } from "@/types/kanji";
import { useEffect, useState } from "react";
import ConfettiAnimation from "@/components/Modal/ConfettiAnimation";
import { Button } from "@/components/ui/button";

export default function BuildKanjiPage() {
  const [radicals, setRadicals] = useState<string[]>([])
  const [selectedRadicals, setSelectedRadicals] = useState<string[]>([]) // Track selected radicals
  const [message, setMessage] = useState<string>('') // Feedback message

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

    const randomRadicals = () => {
      // Limit the list based on the number of learned kanji
      const limitedRadicals = allRadicals.slice(0, 10)

      // Get the radicals from the current kanji (as Radical[])
      const kanjiRadicals = target.radicals

      // Extract only the character values for comparison
      const kanjiRadicalChars = kanjiRadicals.map(r => r.character)

      // Filter out radicals already present in the kanji
      const limitedFiltered = limitedRadicals.filter(
        r => !kanjiRadicalChars.includes(r.character)
      )

      // Shuffle and pick 2 unique extra radicals
      const shuffled = [...limitedFiltered].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, 2)

      // Combine the original kanji radicals with the new ones (still as objects)
      const combined = [...kanjiRadicals, ...selected]

      // Shuffle the final array to randomize the order
      const final = combined.sort(() => Math.random() - 0.5)

      setRadicals(final.map(r => r.character))
    }

    randomRadicals()
  }, [target.radicals]);

  const handleSelectRadical = (radical: string) => {
    // Toggle radical in the selectedRadicals array
    setSelectedRadicals(prevSelected => {
      if (prevSelected.includes(radical)) {
        return prevSelected.filter(r => r !== radical) // Remove if already selected
      } else {
        return [...prevSelected, radical] // Add if not selected
      }
    })
  }

  const handleSubmit = () => {
    // Check if selected radicals match the kanji radicals
    const correctRadicals = target.radicals.map(r => r.character)
    if (selectedRadicals.length === correctRadicals.length && selectedRadicals.every(r => correctRadicals.includes(r))) {
      setMessage("正解")
    } else {
      setMessage("Incorrect. Try again.")
    }
  }

  return (
    <KanjiContainer>
      <KanjiMeanings meanings={target.meanings} />
      <h2 className="text-xl">Selecciona los radicales para armar el kanji.</h2>

      <div className="flex flex-row space-x-2">
        {
          radicals && radicals.map((radical, index) => (
            <span
              key={index}
              onClick={() => handleSelectRadical(radical)} // Handle selection on click
              className={`cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-200 hover:bg-blue-700 active:scale-95 transform ${selectedRadicals.includes(radical) ? 'bg-green-500' : ''}`}
            >
              {radical}
            </span>
          ))
        }
      </div>
      <Button onClick={handleSubmit}>ARMAR</Button>

      {/* Feedback message */}
      {message && <ConfettiAnimation />}
      {message && <p className="mt-4 text-xl">{message}</p>}
      {message && <Button className="z-50" onClick={handleSubmit}>Continuar</Button>}
    </KanjiContainer>
  )
}
