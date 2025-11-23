import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall } from "@/models";
import { ApiResponse } from "@/types/api_response";
import { GetQuickTestRequest, GetQuickTestResponse, SubmitQuickTestAnswerRequest, SubmitQuickTestAnswerResponse } from "@/models/quick_test.model";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getQuickTestQuestions = (body: GetQuickTestRequest): UseApiCall<ApiResponse<GetQuickTestResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<ApiResponse<GetQuickTestResponse>>(
      `${BASE_URL}/quicktest/get-quick-test-questions`,
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
}

export const submitQuickTestAnswer = (body: SubmitQuickTestAnswerRequest): UseApiCall<ApiResponse<SubmitQuickTestAnswerResponse>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.post<ApiResponse<SubmitQuickTestAnswerResponse>>(
      `${BASE_URL}/quicktest/submit-quick-test-answer`,
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
}
