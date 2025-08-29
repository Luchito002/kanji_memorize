import kanjiJson from "@/assets/kanjis_convertidos_nuevo.json";
import { useEffect, useState } from "react";
import { Kanji } from "@/types/kanji";
import { useApi } from "./useApi";
import { ApiResponse } from "@/types/api_response";
import { postCreateDailyProgress, postIncreaseDailyProgress, postDecreaseDailyProgress, postCompleteDailyProgress } from "@/services/apiDailyProgress.service";
import { DailyProgressResponse, KanjiCharRequest } from "@/models/daily_progress.model";

export function useDailyKanjis() {
  const [complete, setComplete] = useState<boolean>(false);
  const [kanjis, setKanjis] = useState<Kanji[]>([]);
  const [index, setIndex] = useState(0);

  const { data } = useApi<ApiResponse<DailyProgressResponse>, void>(postCreateDailyProgress, { autoFetch: true, params: undefined });
  const { fetch: postIncreaseDailyProgressFetch } = useApi<ApiResponse<null>, KanjiCharRequest>(postIncreaseDailyProgress);
  const { fetch: postDecreaseDailyProgressFetch } = useApi<ApiResponse<null>, KanjiCharRequest>(postDecreaseDailyProgress);
  const { fetch: postCompleteDailyProgressFetch } = useApi<ApiResponse<null>, void>(postCompleteDailyProgress);

  useEffect(() => {
    if (!data || !data.result) return;

    const { start_kanji_index, end_kanji_index, today_kanji_index} = data.result;

    if (start_kanji_index >= end_kanji_index) return;

    const dailyKanjis = kanjiJson.slice(start_kanji_index, end_kanji_index);
    setKanjis(dailyKanjis);

    setIndex(today_kanji_index)

  }, [data]);

  const goNext = async (char: string) => {
    if (index >= kanjis.length) return;
    setIndex(index + 1);
    await postIncreaseDailyProgressFetch({kanji_char: char});
  };

  const goPrev = async (char: string) => {
    if (index <= 0) return;
    await postDecreaseDailyProgressFetch({kanji_char: char});
    setIndex(index - 1);
  };

  const completeDailyProgress = async (char: string) => {
    await postIncreaseDailyProgressFetch({kanji_char: char});
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
