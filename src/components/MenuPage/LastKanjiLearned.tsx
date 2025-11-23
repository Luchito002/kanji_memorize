import { useApi } from "@/hooks/useApi";
import { getLastKanjiViewed } from "@/services/apiDailyProgress.service";
import { ApiResponse } from "@/types/api_response";
import { Kanji } from "@/types/kanji";
import { useEffect, useState } from "react";

export default function LastKanjiLearned() {
  const [lastViewedKanji, setLastViewedKanji]  = useState<Kanji>()

  const { data } = useApi<ApiResponse<Kanji>, undefined>(getLastKanjiViewed, { autoFetch: true, params: undefined });

  useEffect(() => {
    if(data) {
      setLastViewedKanji(data.result)
    }
  }, [data])

  return (
    <section className="relative bg-[#fff8f0] dark:bg-[#1a1a1a] text-[#3b2f2f] dark:text-white p-10 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col items-center text-center transition-all">
      <div className="mb-4 text-lg font-medium tracking-wide">{lastViewedKanji?.character !== "一" ? "Último Kanji Revisado" : "Tu primer Kanji"}</div>
      <div className="text-8xl font-bold tracking-wider">{lastViewedKanji?.character}</div>
      <div className="mt-4 text-sm text-[#6b5e5e] dark:text-neutral-400">
        Significado: <span className="font-semibold">{lastViewedKanji?.meaning}</span>
      </div>

      {/* fondo decorativo con formas suaves */}
      <div className="absolute inset-0 rounded-[2rem] overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/textures/soft-waves.svg')] bg-cover opacity-20" />
      </div>
    </section>
  )
}
