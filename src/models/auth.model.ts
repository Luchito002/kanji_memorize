export interface TokenResponse {
  access_token: string
  token_type: string
}

export interface RegisterPayload {
  username: string,
  password: string,
  birthdate: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface UserPreferenceItem {
  question_id: number;
  selected_options: string[];
}

export type UserPreferencesRequest = UserPreferenceItem[];

export type UserPreferencesResponse = UserPreferenceItem[];
