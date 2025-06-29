import KanjiContainer from "@/components/KanjiContainer";
import KanjiProgressHeader from "@/components/KanjiProgressHeader";
import NewKanjiCard from "@/components/NewKanjiPage/NewKanjiCard";
import NewKanjiFooter from "@/components/NewKanjiPage/NewKanjiFooter";
import { useDailyKanjis } from "@/hooks/useDailyKanjis";

export default function NewKanjiPage() {
  const { current, goNext, goPrev, dailyKanjiLimit, index } = useDailyKanjis();

  if (!current) {
    return <h1>CARGANDO KANJIS</h1>
  }

  return (
    <KanjiContainer
      header={<KanjiProgressHeader current={index} max={dailyKanjiLimit || 100} />}
      footer={<NewKanjiFooter next={goNext} previous={goPrev} />}
    >
      <NewKanjiCard kanji={current} />
    </KanjiContainer>
  )
}
