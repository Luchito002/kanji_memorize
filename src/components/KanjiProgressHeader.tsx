import { Progress } from "./progess"
import ButtonBack from "./button-back"

interface Props {
  current: number
  max: number,
  min: number
}

export default function KanjiProgressHeader({ current, max, min}: Props) {
  return (
    <div className="w-full flex items-center justify-between mb-6 gap-4">
      <ButtonBack />

      <Progress current={current} max={max - 1} min={min}/>
    </div>
  )
}

