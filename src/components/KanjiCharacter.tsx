interface Props {
  kanji: string
}

export default function KanjiCharacter({ kanji }: Props) {
  return (
    <div className="rounded p-2 h-32 w-32 bg-kanji-background">
      <div className="relative border border-kanji-border text-7xl h-full w-full flex justify-center items-center">
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute top-1 left-1 border-t border-l w-2 h-2 border-kanji-border" />
          <span className="absolute top-1 right-1 border-t border-r w-2 h-2 border-kanji-border" />
          <span className="absolute bottom-1 left-1 border-b border-l w-2 h-2 border-kanji-border" />
          <span className="absolute bottom-1 right-1 border-b border-r w-2 h-2 border-kanji-border" />
        </div>
        <span className="text-kanji-foreground">{kanji}</span>
      </div>
    </div>
  )
}
