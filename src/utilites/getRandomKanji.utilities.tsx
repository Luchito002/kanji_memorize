import { Kanji } from "@/types/kanji"

export function getRandomKanji(allKanji: Kanji[], correct: string, total: number): string[] {
  const distractors = allKanji
    .filter(k => k.character !== correct)
    .sort(() => Math.random() - 0.5)
    .slice(0, total - 1)
    .map(k => k.character)

  return [...distractors, correct].sort(() => Math.random() - 0.5)
}
