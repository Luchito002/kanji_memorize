export interface FSRSState {
  card_id: number;
  state: number;
  step: number | null;
  stability: number | null;
  difficulty: number | null;
  due: string;
  last_review: string | null;
}
export interface FsrsState {
  card_id: number;
  state: number;
  step: number;
  stability: number | null;
  difficulty: number | null;
  due: string;
  last_review: string | null;
}

export interface CardResponse {
  id: number;
  user_id: string;
  kanji_char: string;
  state: number;
  step?: number | null;
  stability?: number | null;
  difficulty?: number | null;
  due?: string | null;
  last_review?: string | null;
  created_at: string;
}

export interface TodayCardsResponse {
  todays_cards: CardResponse[];
  reviewed_cards: CardResponse[];
  kanji_count: number;
  reviewed_count: number;
  completed: boolean;
}

export interface Intervals {
  Again: string;
  Hard: string;
  Good: string;
  Easy: string;
}


export interface CardWithIntervalsResponse {
  again: string;
  hard: string;
  good: string;
  easy: string;
}

export interface CardWithIntervalsRequest {
  card_id: number
}

export interface ReviewCardRequest {
  card_id: number;
  rating: 1 | 2 | 3 | 4;
  write_time_sec?: number | null;
  stroke_errors?: number | null;
}

export interface FsrsLog {
  card_id: number;
  rating: 1 | 2 | 3 | 4;
  review_datetime: string; // ISO date string
  review_duration: number | null;
}

export interface CreateCardRequest {
  kanji_char: string
}

export interface CreateCardResponse {
  id: string;
  user_id: string;
  kanji_char: string;
  fsrs_state: FSRSState;
}
