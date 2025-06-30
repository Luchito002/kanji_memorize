import KanjiContainer from "@/components/KanjiContainer";
import KanjiProgressHeader from "@/components/KanjiProgressHeader";
import NewKanjiCard from "@/components/NewKanjiPage/NewKanjiCard";
import NewKanjiFooter from "@/components/NewKanjiPage/NewKanjiFooter";
import { useDailyKanjis } from "@/hooks/useDailyKanjis";

export default function NewKanjiPage() {
  const { current, goNext, goPrev, last_kanji_index, today_kanji_index, end_kanji_index } = useDailyKanjis();

  console.log(last_kanji_index, today_kanji_index, end_kanji_index)

  if (!current) {
    return <h1>CARGANDO KANJIS</h1>
  }

  return (
    <KanjiContainer
      header={<KanjiProgressHeader
        min={last_kanji_index}
        current={today_kanji_index}
        max={end_kanji_index}
      />}

      footer={<NewKanjiFooter next={goNext} previous={goPrev} />}
    >
      <NewKanjiCard kanji={current} />
    </KanjiContainer>
  )
}
