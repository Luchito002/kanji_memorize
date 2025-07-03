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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      ref={modalRef}
    >
      {children}
    </div>,
    modalRoot
  )
}
