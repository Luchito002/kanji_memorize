const BASE_URL = "http://localhost:8000";
import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall, GetUserSettingsResponse } from "@/models";
import { ApiResponse } from "@/types/api_response";

export const getUserSettings = (): UseApiCall<ApiResponse<GetUserSettingsResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.get<ApiResponse<GetUserSettingsResponse>>(
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
