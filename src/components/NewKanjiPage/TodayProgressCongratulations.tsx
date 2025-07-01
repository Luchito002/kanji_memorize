import Lottie from "lottie-react";
import confettiAnimation from "@/assets/confetti.json"
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function TodayProgressCongratulations() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/menu")
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 gap-4">
      <Lottie
        animationData={confettiAnimation}
        loop={false}
        className="absolute h-full -z-10"
      />
      <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">¡Felicidades!</h1>
      <p className="text-muted-foreground text-lg">
        Has completado tu estudio de kanjis de hoy. ¡Sigue así!
      </p>
      <Button onClick={handleClick}>Continuar</Button>
    </div>
  );
}
