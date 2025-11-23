export interface DailyProgressResponse {
  start_kanji_index: number
  end_kanji_index: number
  today_kanji_index: number
  completed: boolean
}

export interface KanjiCharRequest {
  kanji_char: string
}
