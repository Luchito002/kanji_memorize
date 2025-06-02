const BASE_URL = "http://localhost:8000";
import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall, UserMeResponse } from "@/models";

export const getUserMe = (): UseApiCall<UserMeResponse> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.get<UserMeResponse>(
      `${BASE_URL}/users/me`,
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
