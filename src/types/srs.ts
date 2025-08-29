export enum SRSStatus {
  learning = "learning",
  review = "review",
  relearning = "relearning",
  mastered = "mastered",
  suspended = "suspended"
}

export interface KanjiSRS {
  kanji_char: string
  status: SRSStatus
  ease_factor: number
  interval: number
  repetition: number
  next_review_at?: Date

  meaning: string,
  story: string,
  jlpt: string,
}
