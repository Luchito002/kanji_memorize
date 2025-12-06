import AdminKanjiTable from "@/components/AdminPage/AdminKanjiTable"
import useAdmin from "@/hooks/useAdmin"

export default function AdminPage() {
  const { allUsersKanjiLearned } = useAdmin()

  if (!allUsersKanjiLearned) {
    return <p className="text-muted-foreground">Cargando...</p>
  }

  return (
    <main className="w-full max-w-5xl mx-auto px-4 space-y-10 py-10">
      <h1 className="text-2xl font-bold mb-4 text-foreground text-center">
        Kanji aprendidos por usuarios
      </h1>
        <AdminKanjiTable data={allUsersKanjiLearned} />
    </main>
  )
}
