import { useApi } from "./useApi";
import { ApiResponse } from "@/types/api_response";
import { useEffect, useState } from "react";
import { getQuickTestQuestions, submitQuickTestAnswer } from "@/services/apiQuickTest.service";
import { GetQuickTestRequest, GetQuickTestResponse, QuickQuestionFull, SubmitQuickTestAnswerRequest, SubmitQuickTestAnswerResponse } from "@/models/quick_test.model";

export default function useQuickTest() {
  const [testQuestions, setTestQuestions] = useState<GetQuickTestResponse>();
  const [currentQuestion, setCurrentQuestion] = useState<QuickQuestionFull | null>(null);

  const { data, fetch: getQuickTestQuestionsFetch } = useApi<ApiResponse<GetQuickTestResponse>, GetQuickTestRequest>(getQuickTestQuestions);
  const { fetch: submitQuickTestAnswerFetch } = useApi<ApiResponse<SubmitQuickTestAnswerResponse>, SubmitQuickTestAnswerRequest>(
    submitQuickTestAnswer
  );

  useEffect(() => {
    getQuickTestQuestionsFetch({ create_new: false });
  }, [getQuickTestQuestionsFetch]);

  useEffect(() => {
    if (!data?.result?.test?.questions?.length) return;
    setTestQuestions(data.result);
    const currentIndex = data.result.test.current ?? 0;
    setCurrentQuestion(data.result.test.questions[currentIndex]);
  }, [data]);

  const handleOptionSelect = async (option: string) => {
    if (!testQuestions) return;
    const isLastQuestion = testQuestions.test.current === testQuestions.test.limit - 1;

    await submitQuickTestAnswerFetch({
      test_id: testQuestions.test.id,
      question_id: testQuestions.test.questions[testQuestions.test.current].id,
      chosen_option: option,
      end_time: isLastQuestion ? new Date().toISOString() : undefined,
    });

    await getQuickTestQuestionsFetch({ create_new: false });
  };

  return {
    testQuestions,
    currentQuestion,
    handleOptionSelect,
    getQuickTestQuestionsFetch,
  };
}
