type Props = {
  header?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}

export default function KanjiContainer({ header, footer, children }: Props) {
  return (
    <main className="flex flex-col w-screen h-screen bg-white dark:bg-neutral-900">
      {header && (
        <div className="w-full sm:p-12 p-6 flex justify-center">
          <div className="max-w-5xl w-full flex justify-center items-center">
            {header}
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col text-center space-y-6 px-6 py-6 w-full z-10 overflow-y-auto">
        {children}
      </div>

      {footer && (
        <div className="w-full sm:p-16 p-6 flex justify-center">
          <div className="max-w-5xl mx-auto">{footer}</div>
        </div>
      )}
    </main>
  )
}
