const BASE_URL = "http://localhost:8000";
import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall } from "@/models";
import { ApiResponse } from "@/types/api_response";
import { DailyProgressResponse, KanjiCharRequest } from "@/models/daily_progress.model";


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

export const postIncreaseDailyProgress = (body: KanjiCharRequest): UseApiCall<ApiResponse<null>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<ApiResponse<null>>(
      `${BASE_URL}/dailyprogress/increase-daily-progress`,
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

export const postDecreaseDailyProgress = (body: KanjiCharRequest): UseApiCall<ApiResponse<null>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<ApiResponse<null>>(
      `${BASE_URL}/dailyprogress/decrease-daily-progress`,
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

export const postCompleteDailyProgress = (): UseApiCall<ApiResponse<null>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<ApiResponse<null>>(
      `${BASE_URL}/dailyprogress/complete-daily-progress`,
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


export const putIncreaseEndKanjiIndex = (increment: number): UseApiCall<ApiResponse<null>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.put<ApiResponse<null>>(
      `${BASE_URL}/dailyprogress/increase-end-kanji-index`,
      { increment },
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
