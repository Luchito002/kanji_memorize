const BASE_URL = "http://localhost:8000";
import axios from "axios";
import {
  LoginPayload,
  TokenResponse,
  RegisterPayload,
  UseApiCall,
  UserPreferencesRequest,
  UserPreferencesResponse
} from "../models";
import { loadAbort } from "../utilities";
import { ApiResponse } from "@/types/api_response";

export const postRegisterUser = (payload: RegisterPayload): UseApiCall<ApiResponse<TokenResponse>> => {
  const controller = loadAbort()

  return {
    call: axios.post<ApiResponse<TokenResponse>>(
      `${BASE_URL}/auth/register`,
      payload,
      { signal: controller.signal }
    ),
    controller
  }
}

export const postLoginUser = (payload: LoginPayload): UseApiCall<TokenResponse> => {
  const controller = loadAbort()

  const body = new URLSearchParams()
  body.append("username", payload.username)
  body.append("password", payload.password)

  return {
    call: axios.post<TokenResponse>(
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


export const createOrUpdateUserPreferences = (body: UserPreferencesRequest): UseApiCall<UserPreferencesResponse> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<UserPreferencesResponse>(
      `${BASE_URL}/auth/user-preferences`,
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
