export interface PieChartResponse {
  labels: string[]
  values: number[]
}

export interface LineProgressResponse {
  x_axis: string[]
  y_axis: number[]
  max_y: number
}

export interface LearnedKanji {
  character: string;
  meaning?: string;
  jlpt?: string;
}

export interface GroupedJLPTResponse {
  learned_count: number;
  n1: LearnedKanji[];
  n2: LearnedKanji[];
  n3: LearnedKanji[];
  n4: LearnedKanji[];
  n5: LearnedKanji[];
}

export interface LearnedKanjiRequest {
  user_id: string;
}

export interface LearnedKanjiResponse {
  count: number;
}

export interface UserGroupedJLPT {
  user_id: string
  username: string
  data: GroupedJLPTResponse
}

export interface AllUsersGroupedJLPTResponse {
  results: UserGroupedJLPT[]
}
