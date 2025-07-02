const BASE_URL = "http://localhost:8000";
import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall, UserSettingsResponse } from "@/models";
import { ApiResponse } from "@/types/api_response";

export const getUserSettings = (): UseApiCall<ApiResponse<UserSettingsResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.get<ApiResponse<UserSettingsResponse>>(
      `${BASE_URL}/userssettings/me`,
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

export const postCreateSettings = (token: string): UseApiCall<ApiResponse<UserSettingsResponse>> => {
  const controller = loadAbort();

  return {
    call: axios.post<ApiResponse<UserSettingsResponse>>(
      `${BASE_URL}/userssettings/create-settings`,
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
};
