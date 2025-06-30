import kanjiJson from "@/assets/kanjis_convertidos_nuevo.json";
import { useEffect, useState } from "react";
import { Kanji } from "@/types/kanji";
import { useApi } from "./useApi";
import { ApiResponse } from "@/types/api_response";
import { postCreateDailyProgress, postIncreaseDailyProgress, postDecreaseDailyProgress } from "@/services/apiDailyProgress.service";
import { DailyProgressResponse } from "@/models/daily_progress.model";

export function useDailyKanjis() {
  const [kanjis, setKanjis] = useState<Kanji[]>([]);
  const [index, setIndex] = useState(0);

  const { data } = useApi<ApiResponse<DailyProgressResponse>, void>(postCreateDailyProgress, {
    autoFetch: true,
    params: undefined,
  });
  const { fetch: postIncreaseDailyProgressFetch } = useApi<ApiResponse<null>, void>(postIncreaseDailyProgress);
  const { fetch: postDecreaseDailyProgressFetch } = useApi<ApiResponse<null>, void>(postDecreaseDailyProgress);

  useEffect(() => {
    if (!data || !data.result) return;

    const { last_kanji_index, end_kanji_index, today_kanji_index } = data.result;

    // Index validate
    if (last_kanji_index >= end_kanji_index) return;

    // Take JSON segment elements
    const dailyKanjis = kanjiJson.slice(last_kanji_index, end_kanji_index);
    setKanjis(dailyKanjis);

    setIndex(today_kanji_index);
  }, [data]);


  const goNext = async () => {
    if (data?.result?.end_kanji_index) {
      if (index + 1 >= data?.result?.end_kanji_index) return;
      postIncreaseDailyProgressFetch();
      setIndex(index + 1);
    }
  };

  const goPrev = async () => {
    if (data?.result?.last_kanji_index) {
      if (index <= data?.result?.last_kanji_index) return;
      postDecreaseDailyProgressFetch();
      setIndex(index - 1);
    }
  };

  return {
    kanjis,
    current: kanjis[index],
    hasNext: index < kanjis.length - 1,
    hasPrev: index > 0,
    last_kanji_index: data?.result?.last_kanji_index ?? 0,
    end_kanji_index: data?.result?.end_kanji_index ?? 0,
    today_kanji_index: index,
    goNext,
    goPrev,
  };
}
