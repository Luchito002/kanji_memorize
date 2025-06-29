export interface GetUserSettingsResponse {
  theme: "light" | "dark" | "system";
  show_kanji_on_home: boolean;
  daily_kanji_limit: number;
  last_kanji_index: number;
}
