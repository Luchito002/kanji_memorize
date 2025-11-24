import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall } from "@/models";
import { ApiResponse } from "@/types/api_response";
import { CardWithIntervalsRequest, CardWithIntervalsResponse, CreateCardRequest, CreateCardResponse, IncrementKanjiCountRequest, ReviewCardRequest, TodayCardsResponse } from "@/models/srs.model";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getTodayCards = (): UseApiCall<ApiResponse<TodayCardsResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.get<ApiResponse<TodayCardsResponse>>(
      `${BASE_URL}/fsrs/get-today-cards`,
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

export const getCardIntervals = (body: CardWithIntervalsRequest): UseApiCall<ApiResponse<CardWithIntervalsResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<ApiResponse<CardWithIntervalsResponse>>(
      `${BASE_URL}/fsrs/get-intervals`,
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

export const cardReview = (body: ReviewCardRequest): UseApiCall<ApiResponse<string>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<ApiResponse<string>>(
      `${BASE_URL}/fsrs/review-card`,
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

export const createCard = (body: CreateCardRequest): UseApiCall<ApiResponse<CreateCardResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<ApiResponse<CreateCardResponse>>(
      `${BASE_URL}/fsrs/create-card`,
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

export const incrementKanjiCount = (body: IncrementKanjiCountRequest): UseApiCall<ApiResponse<null>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<ApiResponse<null>>(
      `${BASE_URL}/fsrs/increment-kanji-count`,
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
