import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall } from "@/models";
import { ApiResponse } from "@/types/api_response";
import { AllUsersGroupedJLPTResponse } from "@/models/daily_fsrs_progress.model";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const  getAllUsersLearnedKanjiGroupedByJlpt = (): UseApiCall<ApiResponse<AllUsersGroupedJLPTResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.get<ApiResponse<AllUsersGroupedJLPTResponse>>(
      `${BASE_URL}/dailyfsrsprogress/learned-kanji-all-users`,
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
