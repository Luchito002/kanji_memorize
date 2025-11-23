import KanjiCharacter from "../KanjiCharacter";
import KanjiMeanings from "../KanjiMeanings";
import { Kanji } from "@/types/kanji";
import { highlightStory } from "@/utilities/highlightStory.utility";
import RadicalExplanation from "../RadicalExplanation";

type Props = {
  kanji: Kanji;
};

export default function NewKanjiCard({ kanji }: Props) {
  if (!kanji) return null;

  // Valores seguros
  const story = kanji.story || "";
  const radicals = kanji.radicals || [];

  // Crear un objeto temporal con radicals para highlightStory
  const kanjiForHighlight = { ...kanji, radicals };

  return (
    <>
      {/* MEANINGS */}
      <KanjiMeanings meanings={kanji.meaning} />

      <div className="flex justify-center items-center gap-4">
        {/* STROKE ORDER */}
        {kanji.strokeOrder && (
          <img
            src={kanji.strokeOrder}
            alt={`Trazos de ${kanji.character}`}
            className="w-28 h-28 object-contain mt-2"
          />
        )}

        {/* KANJI */}
        <KanjiCharacter kanji={kanji.character} />
      </div>
      {/* RADICALS */}
      <div className="flex flex-wrap justify-center gap-2 text-2xl">
        {radicals.map((r, i) => (
          <span key={i}>
            {r.meaning}:{r.char}
            {i < radicals.length - 1 && "  "}
          </span>
        ))}
      </div>

      {/* RADICAL EXPLANATION */}
      {kanji.radicalExplanation &&
        <RadicalExplanation
          explanation={kanji.radicalExplanation}
          radicals={kanji.radicals}
        />
      }

      {/* STORY */}
      <p className="text-lg leading-relaxed lg:px-80">
        {highlightStory(story, kanjiForHighlight)}
      </p>
    </>
  );
}
