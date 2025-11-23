import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall } from "@/models";
import { ApiResponse } from "@/types/api_response";
import { DailyProgressResponse, KanjiCharRequest } from "@/models/daily_progress.model";
import { Kanji } from "@/types/kanji";

const BASE_URL = import.meta.env.VITE_BASE_URL;

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

export const getLastKanjiViewed = (): UseApiCall<ApiResponse<Kanji>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.get<ApiResponse<Kanji>>(
      `${BASE_URL}/dailyprogress/get-last-kanji-viewed`,
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
