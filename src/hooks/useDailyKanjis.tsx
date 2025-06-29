import kanjiJson from "@/assets/kanjis_convertidos_nuevo.json";
import { useEffect, useState } from "react";
import { Kanji } from "@/types/kanji";
import { useApi } from "./useApi";
import { GetUserSettingsResponse } from "@/models";
import { getUserSettings } from "@/services/apiUserSettings.service";

export function useDailyKanjis() {
  const [kanjis, setKanjis] = useState<Kanji[]>([]);
  const [index, setIndex] = useState(0);

  const { data } = useApi<GetUserSettingsResponse, void>(getUserSettings, { autoFetch: true, params: undefined });

  useEffect(() => {
    async function fetchSettings() {
      if (!data) return;

      const { last_kanji_index, daily_kanji_limit } = data;
      const daily = kanjiJson.slice(last_kanji_index, last_kanji_index + daily_kanji_limit);
      setKanjis(daily);
    }

    fetchSettings();
  }, [data]);

  return {
    kanjis,
    current: kanjis[index],
    hasNext: index < kanjis.length - 1,
    hasPrev: index > 0,
    dailyKanjiLimit: data?.daily_kanji_limit,
    index: index,
    goNext: () => setIndex(i => Math.min(i + 1, kanjis.length - 1)),
    goPrev: () => setIndex(i => Math.max(i - 1, 0)),
  };
}
