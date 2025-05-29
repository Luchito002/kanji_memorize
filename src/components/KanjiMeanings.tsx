interface Props {
  meanings: string[]
}

export default function KanjiMeanings({ meanings }: Props) {
  return (
    <h1 className="text-3xl font-bold uppercase">
      {meanings.join(" / ")}
    </h1>
  )
}
