import { ApiResponse } from "@/types/api_response";
import { useApi } from "./useApi";
import { getDailyProgressLineChart, getKanjiProgressPie } from "@/services/apiDailyFsrsProgress.service";
import { LineProgressResponse, PieChartResponse } from "@/models/daily_fsrs_progress.model";
import { useEffect, useState } from "react";

export default function useDailyFsrsProgress() {
  const [pieData, setPieData] = useState<PieChartResponse>()
  const [lineData, setLineData] = useState<LineProgressResponse>()

  const { data: dataPie, loading: loadingPie } = useApi<ApiResponse<PieChartResponse>, void>(getKanjiProgressPie, { autoFetch: true, params: undefined });

  const { data: dataLine, loading: loadingLine } = useApi<ApiResponse<LineProgressResponse>, void>(getDailyProgressLineChart, { autoFetch: true, params: undefined });

  useEffect(() => {
    if (dataPie?.result) {
      setPieData(dataPie.result)
    }

    if (dataLine?.result) {
      setLineData(dataLine.result)
    }

  }, [dataPie, dataLine])

  return {
    pieData,
    loadingPie,
    lineData,
    loadingLine
  }
}
