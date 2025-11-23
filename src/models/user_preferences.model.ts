export interface UserPreferencesResponse {
  question_id: string;
  selected_options: string[];
}

export interface GetUserPreferencesResponse {
  result: UserPreferencesResponse[];
}
