import { Loader2 } from "lucide-react"

interface LoadingAnimationSmallProps {
  label?: string
}

export default function LoadingAnimationSmall({ label }: LoadingAnimationSmallProps) {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-cyan-700 mt-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      {label && <span>{label}</span>}
    </div>
  )
}
