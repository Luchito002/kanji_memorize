import { Kanji } from "@/types/kanji"
import { Button } from "./ui/button"
import { highlightStory } from "@/utilites/highlightStory.utilities";
import KanjiCharacter from "./KanjiCharacter";

interface Props {
  kanji: Kanji
}

export default function NewKanji({ kanji }: Props) {
  return (
    <main className="flex flex-col items-center text-center space-y-6 px-6 py-32 w-full z-10">
      {/* MEANINGS */}
      <h2 className="text-3xl font-bold uppercase">
        {kanji.meanings.join(" / ")}
      </h2>

      <div className="flex justify-center items-center gap-4">
        {/* STROKE ORDER */}
        {kanji.kanjiImages?.kanjiStrokeOrder && (
          <img
            src={kanji.kanjiImages.kanjiStrokeOrder}
            alt={`Orden de trazos de ${kanji.character}`}
            className="w-16 h-16 object-contain mt-2"
          />
        )}

        {/* KANJI */}
        <KanjiCharacter kanji={kanji.character}/>
      </div>

      {/* STORY */}
      <p className="text-lg leading-relaxed lg:px-80">
        {highlightStory(kanji.story, kanji)}
      </p>

      <Button className="mt-6" size="xl">Continuar</Button>
    </main>
  );
}
