import KanjiCanvas from "@/components/KanjiCanvas";
import { KanjiContainer, KanjiContainerContent, KanjiContainerFooter, KanjiContainerHeader } from "@/components/KanjiContainer";
import KanjiMeanings from "@/components/KanjiMeanings";
import KanjiProgressHeader from "@/components/KanjiProgressHeader";
import LoadingAnimation from "@/components/loading-animation";
import { Button } from "@/components/ui/button";
import { useSrs } from "@/hooks/useSrs";

export default function SrsPage() {
  const { dueKanjis, currentKanji } = useSrs()

  if (!currentKanji) return <LoadingAnimation label="Cargando Kanjis" />

  console.log(dueKanjis)

  return (
    <KanjiContainer>
      <KanjiContainerHeader>
        <KanjiProgressHeader
          min={1}
          current={4}
          max={10}
        />
      </KanjiContainerHeader>


      <KanjiContainerContent>
        <div className="flex flex-col justify-center items-center gap-4">
          <KanjiMeanings meanings={currentKanji.meaning} />
          <KanjiCanvas kanjiCharac={currentKanji.kanji_char} />
        </div>
      </KanjiContainerContent>

      <KanjiContainerFooter>
        <Button className="bg-red-600">Una vez mas</Button>
        <Button className="bg-foreground">Dificil</Button>
        <Button className="bg-green-600">Correcto</Button>
        <Button className="bg-blue-600">Facil</Button>
      </KanjiContainerFooter>
    </KanjiContainer>
  )
}
