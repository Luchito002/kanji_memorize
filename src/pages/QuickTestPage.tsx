import { KanjiContainer, KanjiContainerContent, KanjiContainerHeader } from "@/components/KanjiContainer";
import KanjiProgressHeader from "@/components/KanjiProgressHeader";
import LoadingAnimation from "@/components/loading-animation";
import QuickTestCard from "@/components/QuickTestPage/QuickTestCard";
import QuickTestCompleted from "@/components/QuickTestPage/QuickTestCompleted";
import useQuickTest from "@/hooks/useQuickTest";

export default function QuicKTestPage() {
  const { testQuestions, currentQuestion, handleOptionSelect, getQuickTestQuestionsFetch } = useQuickTest();

  const handleCreateTest = async () => {
    await getQuickTestQuestionsFetch({ create_new: true })
  }

  if (!testQuestions) return <LoadingAnimation label="Cargando" />

  if (testQuestions.test.state === "complete") return <QuickTestCompleted testQuestions={testQuestions} onRestart={handleCreateTest}/>

  return (
    <KanjiContainer>
      <KanjiContainerHeader>
        <KanjiProgressHeader
          min={0}
          current={testQuestions.test.current}
          max={10}
        />
      </KanjiContainerHeader>

      <KanjiContainerContent>
        {currentQuestion && (
          <QuickTestCard
            meaning={currentQuestion.meaning}
            options={currentQuestion.options}
            onSelectOption={handleOptionSelect}
          />
        )}
      </KanjiContainerContent>
    </KanjiContainer>
  )
}
