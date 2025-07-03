const BASE_URL = "http://localhost:8000";
import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall, UserResponse, UserEditRequest } from "@/models";
import { ApiResponse } from "@/types/api_response";

export const getUserMe = (): UseApiCall<UserResponse> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.get<UserResponse>(
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


export const putEditUser = (newUser: UserEditRequest): UseApiCall<ApiResponse<UserResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.put<ApiResponse<UserResponse>>(
      `${BASE_URL}/users/edit-user`,
      newUser,
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
