import { GetQuickTestResponse } from "@/models/quick_test.model"
import { FaCheckCircle, FaTimesCircle, FaRedoAlt } from "react-icons/fa"
import ButtonBack from "../button-back"

interface Props {
  testQuestions: GetQuickTestResponse
  onRestart?: () => void
}

export default function QuickTestCompleted({ testQuestions, onRestart }: Props) {
  const { test } = testQuestions
  const correct = test.correct_count
  const wrong = test.wrong_count
  const total = test.limit

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 py-10">
      <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-8 w-full max-w-3xl border border-border animate__animated animate__fadeIn">

        {/* Título y puntuación */}
        <div className="flex">
          <div className="flex flex-1 flex-col">
            <h1 className="text-3xl font-extrabold text-center mb-2">Resultados del Test</h1>
            <p className="text-center text-2xl font-semibold text-primary mb-6">
              Puntuación: {correct}/{total}
            </p>
          </div>
          <ButtonBack />
        </div>

        {/* Resultados globales */}
        <div className="flex justify-around mb-8">
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-green-500 text-3xl mb-1" />
            <p className="text-lg font-bold text-green-600">{correct}</p>
            <span className="text-muted-foreground">Correctas</span>
          </div>
          <div className="flex flex-col items-center">
            <FaTimesCircle className="text-destructive text-3xl mb-1" />
            <p className="text-lg font-bold text-destructive">{wrong}</p>
            <span className="text-muted-foreground">Incorrectas</span>
          </div>
        </div>


        <div>
          {test.questions.map((q, index) => (
            <div key={q.id} className="mb-6">
              {/* Título y estado */}
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-xl font-bold">{index + 1}. {q.meaning}</h1>
                <span className={q.is_correct ? "text-green-700 font-semibold text-2xl" : "text-red-700 font-semibold text-2xl"}>
                  {q.is_correct ? "正解" : "間違い"}
                </span>
              </div>

              {/* Opciones en 2x2 */}
              <div className="grid grid-cols-2 gap-4">
                {q.options.map((o) => {
                  let optionClass =
                    "px-6 py-4 rounded-lg border-2 text-center font-medium text-lg cursor-pointer transition-all flex items-center justify-center";

                  if (q.is_correct) {
                    // Respuesta correcta en verde más suave
                    if (o === q.character)
                      optionClass += " bg-green-100 border-green-400 text-green-700";
                    else
                      // Opciones neutras usando tus variables
                      optionClass += " bg-[var(--color-kanji-background)] border-[var(--color-kanji-border)] text-[var(--color-kanji-foreground)]";
                  } else {
                    // Si respondió mal
                    if (o === q.chosen_meaning)
                      optionClass += " bg-red-100 border-red-400 text-red-700";
                    else if (o === q.character)
                      optionClass += " bg-green-100 border-green-400 text-green-700";
                    else
                      optionClass += " bg-[var(--color-kanji-background)] border-[var(--color-kanji-border)] text-[var(--color-kanji-foreground)]";
                  }

                  return (
                    <div key={o} className={optionClass}>
                      {o}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Botón reiniciar */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-80 hover:scale-105 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md cursor-pointer"
          >
            <FaRedoAlt />
            Hacer otro test
          </button>
        </div>
      </div>
    </div>
  )
}
