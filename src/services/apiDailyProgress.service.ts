const BASE_URL = "http://localhost:8000";
import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall } from "@/models";
import { ApiResponse } from "@/types/api_response";
import { DailyProgressResponse } from "@/models/daily_progress.model";


export const postCreateDailyProgress = (): UseApiCall<ApiResponse<DailyProgressResponse>> => {
  const controller = loadAbort()
  const token = localStorage.getItem("token")

  return {
    call: axios.post<ApiResponse<DailyProgressResponse>>(
      `${BASE_URL}/dailyprogress/create-today-progress`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      }
    ),
    controller,
  }
}

export const postIncreaseDailyProgress = (): UseApiCall<ApiResponse<null>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<ApiResponse<null>>(
      `${BASE_URL}/dailyprogress/increase-daily-progress`,
      null,
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

export const postDecreaseDailyProgress = (): UseApiCall<ApiResponse<null>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<ApiResponse<null>>(
      `${BASE_URL}/dailyprogress/decrease-daily-progress`,
      null,
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
