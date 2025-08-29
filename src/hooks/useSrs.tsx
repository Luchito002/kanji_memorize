import kanjiJson from "@/assets/kanjis_convertidos_nuevo.json";
import { getDueKanji } from "@/services/apiSrs.service";
import { useApi } from "./useApi";
import { ApiResponse } from "@/types/api_response";
import { KanjiSRSResponse } from "@/models/srs.model";
import { useEffect, useState } from "react";
import { KanjiSRS } from "@/types/srs";

export function useSrs() {
  const [dueKanjis, setDueKanjis] = useState<KanjiSRS[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const { data } = useApi<ApiResponse<KanjiSRSResponse[]>, void>(getDueKanji, { autoFetch: true, params: undefined });

  useEffect(() => {
    if (data?.result?.length) {
      const kanjiMap = Object.fromEntries(kanjiJson.map(k => [k.character, k]));

      const enrichedKanjis: KanjiSRS[] = data.result.map(srsItem => {
        const staticInfo = kanjiMap[srsItem.kanji_char] ?? {};

        return {
          ...srsItem,
          meaning: staticInfo.meaning ?? "",
          story: staticInfo.story ?? "",
          jlpt: staticInfo.jlpt ?? "",
        };
      });

      setDueKanjis(enrichedKanjis);
      setCurrentIndex(0);
    }
  }, [data]);

  return {
    dueKanjis,
    currentKanji: dueKanjis[currentIndex],
    currentIndex,
    setCurrentIndex,
  };
}
