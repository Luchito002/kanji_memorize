import { useNavigate } from "react-router-dom"
import { IoCaretBackCircle } from "react-icons/io5";

interface Props {
  className?: string
}

export default function ButtonBack({ className }: Props) {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <IoCaretBackCircle onClick={handleBack} size={50} className={`cursor-pointer text-primary ${className}`} />
  )
}
