const BASE_URL = "http://localhost:8000";
import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall, GetUserSettingsResponse } from "@/models";

export const getUserSettings = (): UseApiCall<GetUserSettingsResponse> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.get<GetUserSettingsResponse>(
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
