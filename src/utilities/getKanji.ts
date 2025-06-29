import kanjisJson from "@/assets/kanjis_convertidos_nuevo.json";
import { Kanji } from "@/types/kanji";

const kanjis = kanjisJson as Kanji[];

export function getKanji(character: string): Kanji | undefined {
  return kanjis.find(x => x.character === character);
}
