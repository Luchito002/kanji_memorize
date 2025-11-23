const BASE_URL = "http://localhost:8000";
import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall, GetUserPreferencesResponse } from "@/models";
import { ApiResponse } from "@/types/api_response";

export const getUserPreferences = (): UseApiCall<ApiResponse<GetUserPreferencesResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.get<ApiResponse<GetUserPreferencesResponse>>(
      `${BASE_URL}/userspreferences/get-user-preferences`,
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
