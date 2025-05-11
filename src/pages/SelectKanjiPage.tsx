import allKanji from "../../public/allKanji.json";
import SelectKanji from "@/components/SelectKanji";
import { Kanji } from "@/types/kanji";
import { getRandomKanji } from "@/utilites/getRandomKanji.utilities";
import { useEffect, useState } from "react";


export default function SelectKanjiPage() {
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

  const options = getRandomKanji(allKanji, target.character, 4);

  return (
    <>
      <SelectKanji kanji={target} options={options} />
    </>
  )
}
