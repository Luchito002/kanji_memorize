import KanjiContainer from "@/components/KanjiContainer";
import KanjiProgressHeader from "@/components/KanjiProgressHeader";
import LoadingAnimation from "@/components/loading-animation";
import NewKanjiCard from "@/components/NewKanjiPage/NewKanjiCard";
import NewKanjiFooter from "@/components/NewKanjiPage/NewKanjiFooter";
import TodayProgressCongratulations from "@/components/NewKanjiPage/TodayProgressCongratulations";
import { useDailyKanjis } from "@/hooks/useDailyKanjis";

export default function NewKanjiPage() {
  const {
    current,
    complete,
    completeDailyProgress,
    goNext,
    goPrev,
    last_kanji_index,
    today_kanji_index,
    end_kanji_index,
    completed
  } = useDailyKanjis();

  if (completed) return <TodayProgressCongratulations />

  if (complete) return <TodayProgressCongratulations />

  if (!current) return <LoadingAnimation label="Cargando Kanjis" />

  return (
    <KanjiContainer
      header={<KanjiProgressHeader
        min={last_kanji_index || 0}
        current={today_kanji_index}
        max={end_kanji_index || 10}
      />}

      footer={<NewKanjiFooter
        next={goNext}
        previous={goPrev}
        complete={today_kanji_index === end_kanji_index ? false : true}
        completeFunction={completeDailyProgress}
      />}
    >
      <NewKanjiCard kanji={current} />
    </KanjiContainer>
  )
}
