export type Radical = {
  character: string,
  meanings: string[]
}
export type KanjiImages = {
  kanjiStrokeOrder: string,
  kanjiEasyRemember?: string,
}

export interface Kanji {
  character: string;
  radicals: Radical[];
  meanings: string[];
  story: string;
  examples?: string[];
  kanjiImages?: KanjiImages;
}

