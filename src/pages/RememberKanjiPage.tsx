import BigMessage from "@/components/big-message"
import KanjiCanvas from "@/components/KanjiCanvas"
import { KanjiContainer, KanjiContainerContent, KanjiContainerFooter, KanjiContainerHeader } from "@/components/KanjiContainer"
import KanjiMeanings from "@/components/KanjiMeanings"
import KanjiProgressHeader from "@/components/KanjiProgressHeader"
import LoadingAnimation from "@/components/loading-animation"
import NewKanjiCard from "@/components/NewKanjiPage/NewKanjiCard"
import { Button } from "@/components/ui/button"
import useFsrs from "@/hooks/useFsrs"
import { useState } from "react"

export default function RememberKanjiPage() {
  const {
    currentKanji,
    reviewKanji,
    currentCard,
    showAnswer,
    setShowAnswer,
    reviewedCount,
    kanjiCount,
    currentIntervals,
    kanjiList
  } = useFsrs()

  const [isComplete, setIsComplete] = useState<boolean>(false)

  if (kanjiList?.length === 0) return <BigMessage message="Sin kanji por repasar"/>
  if (!currentKanji) return <LoadingAnimation label="Cargando Kanji" />
  if (!currentCard) return <LoadingAnimation label="Cargando Kanji" />

  const buttonHandler = async (rating: 1 | 2 | 3 | 4) => {
    reviewKanji(rating)
    setIsComplete(false)
  }

  return (
    <KanjiContainer>
      <KanjiContainerHeader>
        <KanjiProgressHeader
          min={0}
          current={reviewedCount}
          max={kanjiCount}
        />
      </KanjiContainerHeader>

      <KanjiContainerContent>
        {showAnswer ?
          <NewKanjiCard kanji={currentKanji} />
          :
          <div className="flex flex-col justify-center items-center gap-4">
            <KanjiMeanings meanings={currentKanji.meaning} />
            <KanjiCanvas kanjiCharac={currentKanji.character} isComplete={isComplete} setIsComplete={setIsComplete} />
          </div>
        }

      </KanjiContainerContent>

      <KanjiContainerFooter>
        {!showAnswer && !isComplete &&
          <Button onClick={() => setShowAnswer(true)} className="rounded-2xl py-2 text-base font-medium">
            Mostrar Respuesta
          </Button>
        }

        {(isComplete || showAnswer) &&
          <div className="flex gap-4">
            <Button onClick={() => buttonHandler(1)} className="rounded-2xl py-2 text-base font-medium bg-red-800">
              Una vez más ({currentIntervals?.again})
            </Button>
            <Button onClick={() => buttonHandler(2)} className="rounded-2xl py-2 text-base font-medium">
              Difícil ({currentIntervals?.hard})
            </Button>
            <Button onClick={() => buttonHandler(3)} className="rounded-2xl py-2 text-base font-medium bg-blue-900">
              Bien ({currentIntervals?.good})
            </Button>
            <Button onClick={() => buttonHandler(4)} className="rounded-2xl py-2 text-base font-medium bg-green-900">
              Fácil ({currentIntervals?.easy})
            </Button>
          </div>
        }
      </KanjiContainerFooter>
    </KanjiContainer>
  )
}
