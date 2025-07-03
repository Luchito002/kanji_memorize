import { FormEventHandler, ReactNode } from "react"
import { Button } from "../ui/button"

interface Props {
  children: ReactNode
  label: string
  buttonLabel: string
  onSubmit: FormEventHandler<HTMLFormElement>
}

export default function EditContainer({ children, label, buttonLabel, onSubmit }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-card text-card-foreground border border-border rounded-2xl shadow-md p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold">{label}</h2>

      {children}

      <div className="flex justify-center">
        <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
          {buttonLabel}
        </Button>
      </div>
    </form>
  )
}
