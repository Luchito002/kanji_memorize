import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall, GetUserPreferencesResponse } from "@/models";
import { ApiResponse } from "@/types/api_response";

const BASE_URL = import.meta.env.VITE_BASE_URL;

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
