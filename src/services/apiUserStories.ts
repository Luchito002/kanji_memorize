import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall, UserGenerateStoryRequest, UserGenerateStoryResponse, UserGetStoryRequest, UserGetStoryResponse } from "@/models";
import { ApiResponse } from "@/types/api_response";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const postGenerateStory = (body: UserGenerateStoryRequest): UseApiCall<ApiResponse<UserGenerateStoryResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<ApiResponse<UserGenerateStoryResponse>>(
      `${BASE_URL}/usersstories/generate-story`,
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
};


export const getUserStory = (body: UserGetStoryRequest): UseApiCall<ApiResponse<UserGetStoryResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<ApiResponse<UserGetStoryResponse>>(
      `${BASE_URL}/usersstories/get-user-story`,
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
};
