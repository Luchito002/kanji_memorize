const BASE_URL = "http://localhost:8000";
import axios from "axios";
import { loadAbort } from "../utilities";
import { UseApiCall } from "@/models";
import { ApiResponse } from "@/types/api_response";
import { KanjiSRSResponse } from "@/models/srs.model";

export const getDueKanji = (): UseApiCall<ApiResponse<KanjiSRSResponse[]>> => {
  const controller = loadAbort();
  const token = localStorage.getItem("token");

  return {
    call: axios.get<ApiResponse<KanjiSRSResponse[]>>(
      `${BASE_URL}/srs/due-kanji`,
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
