interface Props {
  children: React.ReactNode
}

export default function KanjiContainer({ children }: Props) {
  return (
    <main className="flex items-center justify-center">
      <div className="flex flex-col items-center text-center space-y-6 px-6 py-32 w-full z-10">
        {children}
      </div>
    </main>
  )
}
