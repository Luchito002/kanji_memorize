import { Radical } from "@/types/kanji";

export interface UserGenerateStoryResponse {
  story: string
}

export interface UserGetStoryResponse {
  story: string
}

export interface UserGenerateStoryRequest {
  kanji_meaning: string;
  kanji_char: string;
  radicals: Radical[];
}

export interface UserGetStoryRequest {
  kanji_char: string;
}

