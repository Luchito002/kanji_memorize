import { ApiResponse } from "@/types/api_response";
import { useApi } from "./useApi";
import { KanjiMatchResponse, MatchRequest, MatchResult } from "@/models/kanji_match.model";
import { matchKanji } from "@/services/apiKanjiMatch";
import { useState } from "react";

export function useKanjiMatch() {
  const [matches, setMatches] = useState<MatchResult[]>()
  const { fetch } = useApi<ApiResponse<KanjiMatchResponse>, MatchRequest>(matchKanji);

  const sendToBackend = async (body: MatchRequest) => {
    const matchesResult = await fetch(body)
    setMatches(matchesResult.result?.matches)
    console.log(matchesResult.result?.matches)
  }

  return { sendToBackend, matches };
}
