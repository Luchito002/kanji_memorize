import { Button } from "../ui/button";

interface Props {
  next: () => void;
  previous: () => void;
}

export default function NewKanjiFooter({ next, previous }: Props) {
  return (
    <div className="flex justify-between gap-6">
      <Button className="mt-auto cursor-pointer" size="xl" onClick={previous}>Regresar</Button>
      <Button className="mt-auto cursor-pointer" size="xl" onClick={next}>Continuar</Button>
    </div>
  )
}
