import allKanji from "../../public/allKanji.json";
import BuildKanji from "@/components/BuildKanji";
import { Kanji } from "@/types/kanji";
import { useEffect, useState } from "react";

export default function BuildKanjiPage() {
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
    <>
      <BuildKanji kanji={target} userKanjiLearned={10} />
    </>
  )
}
