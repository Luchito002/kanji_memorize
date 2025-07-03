export type UserSettings = {
  id: number;
  user_id: number;
  theme: Theme;
  daily_kanji_limit: number;
};

export enum Theme {
  Light = "light",
  Dark = "dark",
  System = "system",
}
