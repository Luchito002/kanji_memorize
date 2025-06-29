export type KanjiProgress = {
  user_id: number;
  kanji_char: string;
  status: "learning" | "learned" | "review" | string;
  ease_factor: number;
  interval: number;
  repetition: number;
  last_reviewed_at: string | null;
  next_review_at: string | null;
};
