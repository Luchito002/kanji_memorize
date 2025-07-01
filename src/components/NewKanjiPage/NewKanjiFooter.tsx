import { Button } from "../ui/button";

interface Props {
  next: () => void;
  previous: () => void;
  complete: boolean;
  completeFunction: () => void
}

export default function NewKanjiFooter({ next, previous, complete, completeFunction }: Props) {
  return (
    <div className="flex justify-between gap-6">
      <Button className="mt-auto cursor-pointer" size="xl" onClick={previous}>Regresar</Button>
      {complete
        ?
        <Button className="mt-auto cursor-pointer" size="xl" onClick={next}>Continuar</Button>
        :
        <Button className="mt-auto cursor-pointer" size="xl" onClick={completeFunction}>Completar</Button>
      }
    </div >
  )
}
