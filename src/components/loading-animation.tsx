import Lottie from "lottie-react";
import loadingAnimation from "@/assets/LoadingAnimation.json"

interface Props {
  label?: string
}

export default function LoadingAnimation({ label = "Cargando" }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-3xl">
      <span className="text-muted-foreground mb-4">{label}</span>
      <Lottie animationData={loadingAnimation} />
    </div>
  );
}
