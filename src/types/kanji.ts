export interface Kanji {
  position: number;
  character: string;
  radicals: string[];
  meaning: string;
  story: string;
  jlpt: string;
  examples?: string[];
  strokeOrder: string;
  kanjiEasyRemember?: string;
}

