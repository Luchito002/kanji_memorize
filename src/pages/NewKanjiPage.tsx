import KanjiContainer from "@/components/KanjiContainer";
import KanjiProgressHeader from "@/components/KanjiProgressHeader";
import LoadingAnimation from "@/components/loading-animation";
import NewKanjiCard from "@/components/NewKanjiPage/NewKanjiCard";
import NewKanjiFooter from "@/components/NewKanjiPage/NewKanjiFooter";
import TodayProgressCongratulations from "@/components/NewKanjiPage/TodayProgressCongratulations";
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
    goPrev
  } = useDailyKanjis();

  console.log(today_kanji_index)

  if (completed) return <TodayProgressCongratulations />

  if (complete) return <TodayProgressCongratulations />

  if (!current) return <LoadingAnimation label="Cargando Kanjis" />

  return (
    <KanjiContainer
      header={<KanjiProgressHeader
        min={0}
        current={today_kanji_index}
        max={end_kanji_index}
      />}

      footer={<NewKanjiFooter
        next={goNext}
        previous={goPrev}
        complete={today_kanji_index + 1 === end_kanji_index ? false : true}
        completeFunction={completeDailyProgress}
      />}
    >
      <NewKanjiCard kanji={current} />
    </KanjiContainer>
  )
}
