import { useEffect } from "react";
import confettiAnimation from "@/assets/confetti.json"
import { useModalContext } from "./context/UseModalContext";
import Modal from "./Modal";
import Lottie from "lottie-react";

export default function ConfettiAnimation() {
  const { setState } = useModalContext()

  useEffect(() => {
    setState(true)
  }, [setState])

  return (
    <Modal>
      <Lottie
        animationData={confettiAnimation}
        loop={false}
        className="w-screen h-screen"
        onComplete={() => setState(false)}
      />
    </Modal>
  )
}
