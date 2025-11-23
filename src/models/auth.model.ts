export interface TokenResponse {
  access_token: string
  token_type: string
}

export interface RegisterPayload {
  username: string,
  password: string,
  birthdate: string,
  timezone: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface UserPreferenceItem {
  question_id: number;
  selected_options: string[];
}
