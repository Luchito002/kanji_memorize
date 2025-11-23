export interface Radical {
  char: string;
  meaning: string;
}

export interface Kanji {
  position: number;
  character: string;
  radicals: Radical[];
  meaning: string;
  story: string;
  jlpt: string;
  strokeOrder: string;
  easyRemember: string;
  examples?: string[];
  kanjiEasyRemember?: string;
  radicalExplanation?: string;
  radicalExplanationMeanings?: Radical[];
}

