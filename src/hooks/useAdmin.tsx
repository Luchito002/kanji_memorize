import { useEffect, useState } from "react"
import { useApi } from "./useApi"
import { AllUsersGroupedJLPTResponse } from "@/models/daily_fsrs_progress.model"
import { getAllUsersLearnedKanjiGroupedByJlpt } from "@/services/apiAdmin"
import { ApiResponse } from "@/types/api_response"

export default function useAdmin() {
  const [allUsersKanjiLearned, setAllUsersKanjiLearned] = useState<AllUsersGroupedJLPTResponse | null>(null)

  const { fetch } = useApi<ApiResponse<AllUsersGroupedJLPTResponse>, void>(getAllUsersLearnedKanjiGroupedByJlpt)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch()
        console.log(response)
        if (response?.result?.results) {
          setAllUsersKanjiLearned({ results: response.result.results })
        }
      } catch (error) {
        console.error("Error fetching users kanji:", error)
      }
    }

    loadData()
  }, [fetch])

  return {
    allUsersKanjiLearned
  }
}
