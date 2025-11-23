import { UUID } from "crypto"

export interface QuickQuestionFull {
  id: UUID
  character: string
  meaning: string
  options: string[]
  chosen_meaning?: string
  is_correct?: boolean
}

export interface QuickTestData {
  id: UUID
  state: string
  limit: number
  current: number
  correct_count: number
  wrong_count: number
  questions: QuickQuestionFull[]
}

export interface GetQuickTestRequest {
  create_new: boolean
}

export interface GetQuickTestResponse {
  test: QuickTestData
}

export interface SubmitQuickTestAnswerRequest {
  test_id: UUID;
  question_id: UUID;
  chosen_option: string;
  end_time?: string;
}

export interface SubmitQuickTestAnswerResponse {
  test_id: UUID
  question_id: UUID
  is_correct: boolean
  current: number
  total: number
  completed: boolean
  correct_count: number
  wrong_count: number
}

