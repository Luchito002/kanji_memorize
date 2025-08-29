import { SRSStatus } from "@/types/srs"

export interface KanjiSRSResponse {
  kanji_char: string
  status: SRSStatus
  ease_factor: number
  interval: number
  repetition: number
  next_review_at?: Date
}
