import { FormEventHandler, ReactNode } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode
  titleForm: string
  submitButtonLabel: string,
  changeFormButtonLabel: string,
  changeFormQuestion: string,
  link: string,
  onSubmit: FormEventHandler<HTMLFormElement>
}

export default function CustomFormAuth({ children, titleForm, submitButtonLabel, onSubmit, link, changeFormButtonLabel, changeFormQuestion }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="min-h-screen flex flex-col gap-4 items-center justify-center px-4 my-4"
    >
      <div className="w-full max-w-md text-card-foreground p-8 rounded-2xl shadow-md border border-border">
        <h1 className="text-2xl font-semibold mb-6 text-center">{titleForm}</h1>

        <div className="space-y-4">
          {children}
        </div>
        <div className="flex flex-col justify-center text-center">
          <Button type="submit" className="w-full mt-6 rounded-xl py-2 text-base font-medium">
            {submitButtonLabel}
          </Button>

          <div>
            {changeFormQuestion}
            <Link to={link}> <Button variant="link" size="lg">{changeFormButtonLabel}</Button></Link>
          </div>
        </div>
      </div>
    </form>
  )
}
