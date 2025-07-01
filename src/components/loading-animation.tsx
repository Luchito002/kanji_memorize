import Lottie from "lottie-react";
import loadingAnimation from "@/assets/LoadingAnimation.json"

interface Props {
  label?: string
}

export default function LoadingAnimation({ label = "Cargando" }: Props) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-4 text-3xl">
      <span className="text-muted-foreground">{label}</span>
      <Lottie
        animationData={loadingAnimation}
      />
    </div>
  );
}
