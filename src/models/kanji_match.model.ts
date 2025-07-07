export interface MatchResult {
  kanji: string;
  score: number;
};

export interface MatchRequest {
  strokes: number[][];
}

export interface KanjiMatchResponse {
  matches: MatchResult[];
};


export interface StrokeInput {
  kanji: string;
  stroke_index: number;
  user_line: number[]
}

export interface StrokeValidationResult{
  ok: boolean;
  message: string;
  corrected: number[][];
  done: boolean;
}
