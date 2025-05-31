const BASE_URL = "http://localhost:8000";
import axios from "axios";
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse, UseApiCall } from "../models";
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

export const postLoginUser = (payload: LoginPayload): UseApiCall<LoginResponse> => {
  const controller = loadAbort()

  const body = new URLSearchParams()
  body.append("username", payload.username)
  body.append("password", payload.password)

  return {
    call: axios.post<LoginResponse>(
      `${BASE_URL}/auth/login`,
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        signal: controller.signal
      }
    ),
    controller
  }
}
