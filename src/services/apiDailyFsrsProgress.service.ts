import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall } from "@/models";
import { ApiResponse } from "@/types/api_response";
import { LineProgressResponse, PieChartResponse } from "@/models/daily_fsrs_progress.model";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getKanjiProgressPie = (): UseApiCall<ApiResponse<PieChartResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.get<ApiResponse<PieChartResponse>>(
      `${BASE_URL}/dailyfsrsprogress/piechart`,
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

export const getDailyProgressLineChart = (): UseApiCall<ApiResponse<LineProgressResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.get<ApiResponse<LineProgressResponse>>(
      `${BASE_URL}/dailyfsrsprogress/progressline`,
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

