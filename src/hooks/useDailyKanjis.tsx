import kanjiJson from "@/assets/kanjis_convertidos_normalizado.json";
import { useEffect, useRef, useState } from "react";
import { Kanji } from "@/types/kanji";
import { useApi } from "./useApi";
import { ApiResponse } from "@/types/api_response";
import {
  postCreateDailyProgress,
  postIncreaseDailyProgress,
  postDecreaseDailyProgress,
  postCompleteDailyProgress
} from "@/services/apiDailyProgress.service";
import {
  DailyProgressResponse,
  KanjiCharRequest
} from "@/models/daily_progress.model";
import {
  UserGenerateStoryRequest,
  UserGenerateStoryResponse,
  UserGetStoryRequest,
  UserGetStoryResponse
} from "@/models";

import { getUserStory, postGenerateStory } from "@/services/apiUserStories";
import { MessageProps } from "@/components/message";
import { CreateCardRequest, CreateCardResponse } from "@/models/srs.model";
import { createCard } from "@/services/apiFsrs.service";

export function useDailyKanjis() {
  const [complete, setComplete] = useState<boolean>(false);
  const [generatingStory, setGeneratingStory] = useState<boolean>(false);
  const [kanjis, setKanjis] = useState<Kanji[]>([]);
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState<MessageProps>();
  const generatedSet = useRef<Set<number>>(new Set());

  const { data } = useApi<ApiResponse<DailyProgressResponse>, void>(
    postCreateDailyProgress,
    { autoFetch: true, params: undefined }
  );

  const { fetch: postIncreaseDailyProgressFetch } = useApi<ApiResponse<null>, KanjiCharRequest>(postIncreaseDailyProgress);
  const { fetch: postDecreaseDailyProgressFetch } = useApi<ApiResponse<null>, KanjiCharRequest>(postDecreaseDailyProgress);
  const { fetch: postCompleteDailyProgressFetch } = useApi<ApiResponse<null>, void>(postCompleteDailyProgress);
  const { fetch: generateStoryFetch } = useApi<ApiResponse<UserGenerateStoryResponse>, UserGenerateStoryRequest>(postGenerateStory);
  const { fetch: getUserStoryFetch } = useApi<ApiResponse<UserGetStoryResponse>, UserGetStoryRequest>(getUserStory);
  const { fetch: createCardFetch } = useApi<ApiResponse<CreateCardResponse>, CreateCardRequest>(createCard)


  useEffect(() => {
    if (!data?.result) return;

    const { start_kanji_index, end_kanji_index, today_kanji_index } = data.result;
    if (start_kanji_index >= end_kanji_index) return;

    const dailyKanjis = kanjiJson.slice(start_kanji_index, end_kanji_index);

    setKanjis(dailyKanjis);
    setIndex(today_kanji_index);
  }, [data]);

  useEffect(() => {
    const handleStory = async () => {
      if (!kanjis[index]) return;

      setGeneratingStory(true);

      // Primero, intentar obtener la historia del usuario
      const userStoryResponse = await getUserStoryFetch({ kanji_char: kanjis[index].character });

      if (userStoryResponse.status === "success" && userStoryResponse.result?.story) {
        setKanjis((prev) => {
          const updated = [...prev];
          updated[index] = { ...updated[index], story: userStoryResponse.result?.story ?? "" };
          return updated;
        });
        setMessage({
          type: "success",
          message: "Historia cargada desde el usuario"
        });
      } else {
        // Si no hay historia del usuario, generar una nueva
        const generateStoryResponse = await generateStoryFetch({
          kanji_meaning: kanjis[index].meaning,
          kanji_char: kanjis[index].character,
          radicals: kanjis[index].radicals,
        });

        const generatedStory = generateStoryResponse.result;

        if (generatedStory) {
          setKanjis((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], story: generatedStory.story };
            return updated;
          });
          setMessage({
            type: "success",
            message: "Se generó la historia exitosamente"
          });
        } else {
          setMessage({
            type: "alert",
            message: "No se pudo generar la historia. Mostrando historia por defecto"
          });
        }
      }

      setGeneratingStory(false);
      // Marcar que ya se generó para este índice
      generatedSet.current.add(index);
    };

    if (kanjis.length > 0 && !generatedSet.current.has(index)) {
      handleStory();
    }
  }, [kanjis, index, generateStoryFetch, getUserStoryFetch]);

  const goNext = async (char: string) => {
    if (index >= kanjis.length) return;
    setIndex(index + 1);
    await postIncreaseDailyProgressFetch({ kanji_char: char });
    await createCardFetch({ kanji_char: char });
  };

  const goPrev = async (char: string) => {
    if (index <= 0) return;
    await postDecreaseDailyProgressFetch({ kanji_char: char });
    setIndex(index - 1);
  };

  const completeDailyProgress = async (char: string) => {
    await postIncreaseDailyProgressFetch({ kanji_char: char });
    await createCardFetch({ kanji_char: char });
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
    generatingStory,
    message
  };
}
