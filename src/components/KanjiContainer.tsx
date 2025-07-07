import { ReactNode } from "react"

type Props = {
  children: React.ReactNode
}
export function KanjiContainer({ children }: Props) {
  return (
    <main className="flex flex-col w-screen h-screen bg-white dark:bg-neutral-900">
      {children}
    </main>
  )
}

interface PropsHeader {
  children: ReactNode
}
export function KanjiContainerHeader({ children }: PropsHeader) {
  return (
    <div className="w-full sm:p-12 p-6 flex justify-center">
      <div className="max-w-5xl w-full flex justify-center items-center">
        {children}
      </div>
    </div>
  )
}

interface PropsFooter {
  children: ReactNode
}
export function KanjiContainerFooter({ children }: PropsFooter) {
  return (
    <div className="w-full sm:p-16 p-6 flex justify-center">
      <div className="max-w-5xl mx-auto">{children}</div>
    </div>
  )
}

interface PropsContent {
  children: ReactNode
}
export function KanjiContainerContent({ children }: PropsContent) {
  return (
    <div className="flex-1 flex flex-col text-center space-y-6 px-6 py-6 w-full z-10 overflow-y-auto">
      {children}
    </div>
  )
}
