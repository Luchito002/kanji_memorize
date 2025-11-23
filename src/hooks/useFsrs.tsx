import kanjiJson from "@/assets/kanjis_convertidos_normalizado.json";
import { cardReview, getCardIntervals, getTodayCards } from "@/services/apiFsrs.service";
import { useApi } from "./useApi";
import { ApiResponse } from "@/types/api_response";
import {
  CardResponse,
  CardWithIntervalsRequest,
  CardWithIntervalsResponse,
  ReviewCardRequest,
  TodayCardsResponse
} from "@/models/srs.model";
import { useEffect, useState, useCallback } from "react";
import { Kanji } from "@/types/kanji";
import { useRememberKanji } from "@/context/RememberKanjiContext";

export default function useFsrs() {
  const { strokeErrors, writeTimeSec } = useRememberKanji()
  const [currentKanji, setCurrentKanji] = useState<Kanji>();
  const [currentIntervals, setCurrentIntervals] = useState<CardWithIntervalsResponse>();
  const [kanjiList, setKanjiList] = useState<Kanji[]>();
  const [kanjiCount, setKanjiCount] = useState<number>(10);
  const [reviewedCount, setReviewedCount] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<CardResponse>();
  const [showAnswer, setShowAnswer] = useState<boolean>();

  const { data, fetch: getTodayCardsFetch } = useApi<ApiResponse<TodayCardsResponse>, void>(getTodayCards, { autoFetch: true, params: undefined });
  const { fetch: getCardIntervalsFetch } = useApi<ApiResponse<CardWithIntervalsResponse>, CardWithIntervalsRequest>(getCardIntervals);
  const { fetch: reviewCardFetch } = useApi<ApiResponse<string>, ReviewCardRequest>(cardReview);

  // Actualiza kanji actual y lista
  const updateCurrentFromResult = (result?: CardResponse[]) => {
    if (!result) return;


    const foundKanjiList: Kanji[] = result
      .map(card => kanjiJson.find(k => k.character === card.kanji_char))
      .filter(Boolean) as Kanji[];


    setKanjiList(prev => {
      const existing = prev ?? [];
      const existingChars = new Set(existing.map(k => k.character));
      const toAdd = foundKanjiList.filter(k => !existingChars.has(k.character));
      return [...existing, ...toAdd];
    });

    const firstKanji = foundKanjiList[0];
    if (firstKanji) {
      setCurrentKanji(firstKanji);
      setCurrentCard(result[0]);
    }
  };

  // Actualiza intervalos del kanji actual
  const updateCurrentIntervals = useCallback(async (cardId: number) => {
    if (!cardId) return;
    try {
      const response = await getCardIntervalsFetch({ card_id: cardId });
      if (response?.result) {
        setCurrentIntervals(response.result);
      }
    } catch (error) {
      console.error("Error fetching intervals:", error);
    }
  }, [getCardIntervalsFetch]);

  // Inicialización cuando llega data
  useEffect(() => {
    const init = async () => {
      if (!data?.result) return;

      // Actualizar kanji actual y lista
      updateCurrentFromResult(data.result.todays_cards);

      // Actualizar intervalos del primer kanji
      if (data.result.todays_cards.length > 0) {
        const firstCardId = data.result.todays_cards[0].id;
        await updateCurrentIntervals(firstCardId);
      }

      // Contadores
      setReviewedCount(data.result.reviewed_count);
      setKanjiCount(data.result.kanji_count);
    };

    init();
  }, [data, updateCurrentIntervals]);

  // Revisar un kanji y actualizar
  const reviewKanji = async (rating: 1 | 2 | 3 | 4) => {
    if (!currentCard) return;

    setShowAnswer(false);

    await reviewCardFetch({
      card_id: currentCard.id,
      rating,
      write_time_sec: writeTimeSec,
      stroke_errors: strokeErrors
    });

    const response = await getTodayCardsFetch();

    const todaysCards = response?.result?.todays_cards ?? [];

    updateCurrentFromResult(todaysCards);

    console.log("BEFORE:", todaysCards.map(c => c.kanji_char));

    // Actualizar intervalos del nuevo kanji actual si hay cartas
    if (todaysCards.length > 0) {
      const firstCardId = todaysCards[0].id;
      await updateCurrentIntervals(firstCardId);
    }

    setReviewedCount(response?.result?.reviewed_count ?? reviewedCount);
    setKanjiCount(response?.result?.kanji_count ?? kanjiCount);
  };


  return {
    currentKanji,
    kanjiList,
    reviewKanji,
    currentCard,
    showAnswer,
    setShowAnswer,
    reviewedCount,
    kanjiCount,
    currentIntervals,
  };
}
