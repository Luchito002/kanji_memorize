const BASE_URL = "http://localhost:8000";
import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall } from "@/models";
import { ApiResponse } from "@/types/api_response";
import { KanjiMatchResponse, MatchRequest, StrokeInput, StrokeValidationResult } from "@/models/kanji_match.model";

export const matchKanji = (body: MatchRequest): UseApiCall<ApiResponse<KanjiMatchResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<ApiResponse<KanjiMatchResponse>>(
      `${BASE_URL}/kanjimatch/match`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      }
    ),
    controller,
  };
}

export const validateStroke = (body: StrokeInput): UseApiCall<ApiResponse<StrokeValidationResult>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<ApiResponse<StrokeValidationResult>>(
      `${BASE_URL}/kanjimatch/validate-stroke`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      }
    ),
    controller,
  };
}
