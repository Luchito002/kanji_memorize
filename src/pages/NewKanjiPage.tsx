import NewKanji from "@/components/NewKanji";
import allKanji from "../../public/allKanji.json";
import { Kanji } from "@/types/kanji";
import { useEffect, useState } from "react";

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
    <div className="flex items-center justify-center">
      <NewKanji kanji={target} />
    </div>
  )
}
