import { KanjiContainer, KanjiContainerContent, KanjiContainerFooter, KanjiContainerHeader } from "@/components/KanjiContainer";
import KanjiProgressHeader from "@/components/KanjiProgressHeader";
import LoadingAnimation from "@/components/loading-animation";
import NewKanjiCard from "@/components/NewKanjiPage/NewKanjiCard";
import NewKanjiFooter from "@/components/NewKanjiPage/NewKanjiFooter";
import TodayProgressCongratulations from "@/components/NewKanjiPage/TodayProgressCongratulations";
import Message from "@/components/message";
import { useDailyKanjis } from "@/hooks/useDailyKanjis";

export default function NewKanjiPage() {
  const {
    complete,
    completeDailyProgress,
    current,
    today_kanji_index,
    end_kanji_index,
    completed,
    goNext,
    goPrev,
    generatingStory,
    message
  } = useDailyKanjis();

  if (completed) return <TodayProgressCongratulations />

  if (complete) return <TodayProgressCongratulations />

  if (!current) return <LoadingAnimation label="Cargando Kanjis" />

  if (generatingStory) return <LoadingAnimation label="Generando historia" />

  return (
    <KanjiContainer>
      {message &&
        //<Message type={message.type} message={message.message} />
        <></>
      }
      <KanjiContainerHeader>
        <KanjiProgressHeader
          min={0}
          current={today_kanji_index}
          max={end_kanji_index}
        />
      </KanjiContainerHeader>

      <KanjiContainerContent>
        <NewKanjiCard kanji={current} />
      </KanjiContainerContent>

      <KanjiContainerFooter>
        <NewKanjiFooter
          next={() => { goNext(current.character) }}
          previous={() => { goPrev(current.character) }}
          complete={today_kanji_index + 1 === end_kanji_index ? false : true}
          completeFunction={() => { completeDailyProgress(current.character) }}
        />
      </KanjiContainerFooter>
    </KanjiContainer>
  )
}
