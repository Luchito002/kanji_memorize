export default function LastKanjiLearned() {
  return (
    <section className="bg-kanji-background text-kanji-foreground dark:bg-card dark:text-card-foreground p-6 rounded-xl shadow-md flex flex-col items-center text-center transition-colors">
      <div className="mb-2 text-lg">Ultimo Kanji Aprendido</div>
      <div className="text-7xl font-bold tracking-wide">水</div>
      <div className="mt-2 text-lg">Lectura: すい / みず</div>
      <div className="text-muted-foreground text-sm">Significado: agua</div>
      <div className="italic text-sm text-muted-foreground mt-1">例: 水を飲みます。</div>
    </section>
  )
}
