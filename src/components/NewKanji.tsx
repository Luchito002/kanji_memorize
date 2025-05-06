import { Kanji } from "@/types/kanji"
import { Button } from "./ui/button"
import { highlightStory } from "@/utilites/highlightStory.utilites";

interface Props {
  kanji: Kanji
}

export default function NewKanji({ kanji }: Props) {
  return (
    <div className="flex flex-col items-center text-center space-y-6 p-6 max-w-xl mx-auto">
      {/* MEANINGS */}
      <h2 className="text-xl text-gray-600 italic">
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
        <h1 className="text-6xl font-extrabold">{kanji.character}</h1>
      </div>

      {/* STORY */}
      <p className="text-lg leading-relaxed px-2">
        {highlightStory(kanji.story, kanji)}
      </p>

      {/* EXAMPLES */}
      {kanji.examples && kanji.examples.length > 0 && (
        <div className="w-full mt-4 text-left">
          <h3 className="text-lg font-semibold underline mb-2">Ejemplos</h3>
          <ul className="list-disc list-inside space-y-1 text-base">
            {kanji.examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
      )}

      <Button className="mt-6">Continuar</Button>
    </div>
  );
}
