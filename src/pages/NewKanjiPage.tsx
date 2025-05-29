import allKanji from "../../public/allKanji.json";
import { Kanji } from "@/types/kanji";
import { useEffect, useState } from "react";
import KanjiContainer from "@/components/KanjiContainer";
import KanjiMeanings from "@/components/KanjiMeanings";
import KanjiCharacter from "@/components/KanjiCharacter";
import { highlightStory } from "@/utilities/highlightStory.utility";
import { Button } from "@/components/ui/button";

export default function NewKanjiPage() {
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

  return (
    <KanjiContainer>
      {/* MEANINGS*/}
      <KanjiMeanings meanings={target.meanings} />

      <div className="flex justify-center items-center gap-4">
        {/* STROKE ORDER */}
        {target.kanjiImages?.kanjiStrokeOrder &&
          <img
            src={target.kanjiImages?.kanjiStrokeOrder}
            alt={`Trazos de ${target.character}`}
            className="w-28 h-28 object-contain mt-2"
          />
        }
        {/* KANJI */}
        <KanjiCharacter kanji={target.character} />
      </div>

      {/* STORY */}
      <p className="text-lg leading-relaxed lg:px-80">
        {highlightStory(target.story, target)}
      </p>

      <Button className="mt-6" size="xl">Continuar</Button>
    </KanjiContainer>
  )
}
