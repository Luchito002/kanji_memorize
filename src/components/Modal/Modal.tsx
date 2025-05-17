import { useRef } from "react"
import { createPortal } from "react-dom"
import { useModalContext } from "./context/UseModalContext"

interface Props {
  children: React.ReactNode
}

export default function Modal({ children }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)

  const { state } = useModalContext()

  const modalRoot = document.getElementById("modal")

  if (!state || !modalRoot) {
    return null;
  }

  return createPortal(
    <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center content-center z-50" ref={modalRef}>
      {children}
    </div>
    , modalRoot
  )
}
