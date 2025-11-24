import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall, UserSettingsEditRequest, UserSettingsResponse } from "@/models";
import { ApiResponse } from "@/types/api_response";


const BASE_URL = import.meta.env.VITE_BASE_URL;

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

export const putEditSettings = (body: UserSettingsEditRequest): UseApiCall<ApiResponse<UserSettingsResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.put<ApiResponse<UserSettingsResponse>>(
      `${BASE_URL}/userssettings/edit-settings`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal
      }
    ),
    controller,
  }
}
