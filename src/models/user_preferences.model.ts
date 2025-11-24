export interface UserPreferenceEntry {
  question_id: number;
  selected_options: string[];
}

export type UserPreferencesRequest = UserPreferenceEntry[];

export interface UserPreferencesResponse {
  question_id: string;
  selected_options: string[];
}

export interface GetUserPreferencesResponse {
  result: UserPreferencesResponse[];
}
