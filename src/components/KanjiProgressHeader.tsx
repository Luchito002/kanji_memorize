import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Progress } from "./progess"

interface Props {
  current: number
  max: number,
  min: number
}

export default function KanjiProgressHeader({ current, max, min}: Props) {
  const navigate = useNavigate()

  const onExit = () => {
    navigate("/menu")
  }

  return (
    <div className="w-full flex items-center justify-between mb-6 gap-4">
      <Progress current={current} max={max} min={min}/>

      {/* Exit button */}
      <button
        onClick={onExit}
        className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
        aria-label="Salir"
      >
        <X size={24} />
      </button>
    </div>
  )
}

