const BASE_URL = "http://localhost:8000";
import axios from "axios";
import { RegisterPayload, RegisterResponse, UseApiCall } from "../models";
import { loadAbort } from "../utilities";

export const postRegisterUser = (payload: RegisterPayload): UseApiCall<RegisterResponse> => {
  const controller = loadAbort()

  return {
    call: axios.post<RegisterResponse>(
      `${BASE_URL}/auth/register`,
      payload,
      { signal: controller.signal }
    ),
    controller
  }
}
