import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/progess";
import questionsData from "@/data/questions.json";
import { useApi } from "@/hooks/useApi";
import { UserPreferencesRequest, UserPreferencesResponse } from "@/models";
import { createOrUpdateUserPreferences } from "@/services/api.service";
import { useNavigate } from "react-router-dom";

export default function RegisterQuestionsPage() {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { fetch } = useApi<UserPreferencesResponse, UserPreferencesRequest>(createOrUpdateUserPreferences);

  const [answers, setAnswers] = useState<
    { question_id: number; selected_options: string[] }[]
  >([]);

  const questions = questionsData.questions;

  const handleOptionChange = (option: string) => {
    const maxSelection = questions[currentQuestion].maxSelection || 1;
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else if (selectedOptions.length < maxSelection) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const nextQuestion = () => {
    const existingIndex = answers.findIndex(
      (a) => a.question_id === questions[currentQuestion].id
    );

    const newAnswer = {
      question_id: questions[currentQuestion].id,
      selected_options: selectedOptions,
    };

    if (existingIndex > -1) {
      const updated = [...answers];
      updated[existingIndex] = newAnswer;
      setAnswers(updated);
    } else {
      setAnswers([...answers, newAnswer]);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOptions([]);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);

      const prevAnswer = answers.find(
        (a) => a.question_id === questions[currentQuestion - 1].id
      );
      setSelectedOptions(prevAnswer?.selected_options || []);
    }
  };

  const isContinueDisabled = selectedOptions.length === 0;

  const submitAll = async () => {
    const currentAnswer = {
      question_id: questions[currentQuestion].id,
      selected_options: selectedOptions,
    };

    const existingIndex = answers.findIndex(
      (a) => a.question_id === currentAnswer.question_id
    );

    let finalAnswers = [];
    if (existingIndex > -1) {
      const updated = [...answers];
      updated[existingIndex] = currentAnswer;
      finalAnswers = updated;
    } else {
      finalAnswers = [...answers, currentAnswer];
    }
    await fetch(finalAnswers);
    navigate("/menu");
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-4 md:p-10">
      <div className="max-w-3xl w-full text-card-foreground p-6 sm:p-8 md:p-10 rounded-2xl shadow-md border border-border flex flex-col">
        {/* Barra de progreso */}
        <div className="mb-6">
          <Progress min={0} current={currentQuestion} max={questions.length - 1} />
        </div>

        {/* Pregunta */}
        <div className="mb-6 flex-1 overflow-y-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-foreground text-center md:text-left">
            {questions[currentQuestion].question}
          </h2>

          {/* Opciones */}
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedOptions.includes(option);
              return (
                <div
                  key={index}
                  onClick={() => handleOptionChange(option)}
                  className={`flex items-center justify-center text-center cursor-pointer px-3 py-2 rounded-md transition-colors ${isSelected
                    ? "bg-option-selected-background hover:bg-option-selected-hover"
                    : "bg-option-unselected-background hover:bg-option-unselected-hover"
                    }`}
                >
                  <label className="text-sm md:text-base cursor-pointer">{option}</label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-6 mt-4">
          <Button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="w-full sm:w-auto px-6 py-3 bg-muted text-white rounded-md hover:bg-muted-foreground transition-colors disabled:opacity-50"
          >
            Atrás
          </Button>

          {currentQuestion < questions.length - 1 ? (
            <Button
              onClick={nextQuestion}
              disabled={isContinueDisabled}
              className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-md hover:bg-primary-foreground transition-colors disabled:opacity-50"
            >
              Continuar
            </Button>
          ) : (
            <Button
              onClick={submitAll}
              disabled={answers.length === 0}
              className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Enviar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
