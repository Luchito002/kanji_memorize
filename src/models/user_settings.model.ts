import { Theme } from "@/types/user_settings";

export interface UserSettingsResponse {
  theme: Theme,
  daily_kanji_limit: number;
  daily_srs_limit: number;
}

export interface UserSettingsEditRequest {
  theme?: Theme;
  daily_kanji_limit?: number;
  daily_srs_limit?: number;
}
