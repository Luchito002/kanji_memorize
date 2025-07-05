import kanjiJson from "@/assets/kanjis_convertidos_nuevo.json";
import { useEffect, useState } from "react";
import { Kanji } from "@/types/kanji";
import { useApi } from "./useApi";
import { ApiResponse } from "@/types/api_response";
import { postCreateDailyProgress, postIncreaseDailyProgress, postDecreaseDailyProgress, postCompleteDailyProgress } from "@/services/apiDailyProgress.service";
import { DailyProgressResponse } from "@/models/daily_progress.model";

export function useDailyKanjis() {
  const [complete, setComplete] = useState<boolean>(false);
  const [kanjis, setKanjis] = useState<Kanji[]>([]);
  const [index, setIndex] = useState(0);

  const { data } = useApi<ApiResponse<DailyProgressResponse>, void>(postCreateDailyProgress, { autoFetch: true, params: undefined });
  const { fetch: postIncreaseDailyProgressFetch } = useApi<ApiResponse<null>, void>(postIncreaseDailyProgress);
  const { fetch: postDecreaseDailyProgressFetch } = useApi<ApiResponse<null>, void>(postDecreaseDailyProgress);
  const { fetch: postCompleteDailyProgressFetch } = useApi<ApiResponse<null>, void>(postCompleteDailyProgress);

  useEffect(() => {
    if (!data || !data.result) return;

    const { start_kanji_index, end_kanji_index, today_kanji_index} = data.result;

    if (start_kanji_index >= end_kanji_index) return;

    const dailyKanjis = kanjiJson.slice(start_kanji_index, end_kanji_index);
    console.log(dailyKanjis)
    setKanjis(dailyKanjis);

    setIndex(today_kanji_index)

  }, [data]);

  const goNext = async () => {
    if (index >= kanjis.length) return;
    await postIncreaseDailyProgressFetch();
    setIndex(index + 1);
  };

  const goPrev = async () => {
    if (index <= kanjis[0].position) return;
    await postDecreaseDailyProgressFetch();
    setIndex(index - 1);
  };

  const completeDailyProgress = async () => {
    await postIncreaseDailyProgressFetch();
    await postCompleteDailyProgressFetch();
    setComplete(true);
  };

  return {
    complete,
    completeDailyProgress,
    current: kanjis[index] ?? null,
    start_kanji_index: data?.result?.start_kanji_index,
    end_kanji_index: kanjis.length,
    today_kanji_index: index,
    completed: data?.result?.completed,
    goNext,
    goPrev,
  };
}
