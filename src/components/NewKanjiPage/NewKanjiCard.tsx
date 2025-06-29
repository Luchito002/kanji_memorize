import KanjiCharacter from "../KanjiCharacter";
import KanjiMeanings from "../KanjiMeanings";
import { Kanji } from "@/types/kanji";
import { highlightStory } from "@/utilities/highlightStory.utility";

type Props = {
  kanji: Kanji;
};

export default function NewKanjiCard({ kanji }: Props) {
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

      {/* STORY */}
      <p className="text-lg leading-relaxed lg:px-80">
        {highlightStory(kanji.story, kanji)}
      </p>
    </>
  );
}
