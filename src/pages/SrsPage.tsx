import KanjiCanvas from "@/components/KanjiCanvas";
import { KanjiContainer, KanjiContainerContent, KanjiContainerFooter, KanjiContainerHeader } from "@/components/KanjiContainer";
import KanjiProgressHeader from "@/components/KanjiProgressHeader";
import { Button } from "@/components/ui/button";
import { useKanjiMatch } from "@/hooks/useKanjiMatch";

export default function SrsPage() {
  const { sendToBackend, matches } = useKanjiMatch();

  const handleMatch = async (lines: number[][]) => {
    await sendToBackend({ strokes: lines });
    if (matches && matches.length > 0) {
      const best = matches[0];
      alert(`¿Tal vez dibujaste?: ${best.kanji} (${best.score.toFixed(1)}%)`);
    }
  };

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
        <div className="flex justify-center items-center gap-4">
          <KanjiCanvas onMatchRequest={handleMatch} />
        </div>
        <div className="flex gap-5">
          {matches &&

            matches.map((match) => (
              <span>{match.kanji}</span>
            ))
          }
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
