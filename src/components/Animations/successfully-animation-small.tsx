import { CheckCircle2 } from "lucide-react"

interface LoadingAnimationSmallProps {
  label?: string
}

export default function SuccessfullyAnimationSmall({ label }: LoadingAnimationSmallProps) {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-green-600 mt-2">
      <CheckCircle2 className="h-4 w-4" />
      {label && <span>{label}</span>}
    </div>
  )
}
