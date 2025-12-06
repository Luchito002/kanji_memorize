import { useState, useMemo } from "react"
import Modal from "@/components/Modal/Modal"
import { GroupedJLPTResponse } from "@/models/daily_fsrs_progress.model"
import Input from "@mui/material/Input"
import { IoCloseCircle } from "react-icons/io5"

// 🔹 Cambiado el orden a N5 → N1
const LEVELS = [
  { key: "n5", label: "N5" },
  { key: "n4", label: "N4" },
  { key: "n3", label: "N3" },
  { key: "n2", label: "N2" },
  { key: "n1", label: "N1" },
] as const

interface Props {
  detail: GroupedJLPTResponse
  username: string
  onClose: () => void
}

export default function AdminKanjiLearnedDetailsModal({ detail, username, onClose }: Props) {
  const [search, setSearch] = useState("")

  const filteredDetails = useMemo(() => {
    const query = search.toLowerCase()
    const filtered = { ...detail }

    LEVELS.forEach(({ key }) => {
      filtered[key] = detail[key].filter((k) =>
        k.character.includes(search) ||
        (k.meaning ? k.meaning.toLowerCase().includes(query) : false)
      )
    })

    return filtered
  }, [search, detail])

  return (
    <Modal>
      <div className="bg-background p-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Caracteres kanji que el estudiante {username} ya ha aprendido
          </h2>

          <IoCloseCircle onClick={onClose} size={50} className="cursor-pointer text-primary" />
        </div>

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar kanji o significado..."
          className="w-full"
        />

        <p className="text-muted-foreground">
          Total aprendidos: <strong>{detail.learned_count}</strong>
        </p>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {LEVELS.map(({ key, label }) => {
            const list = filteredDetails[key]
            if (!list || list.length === 0) return null

            return (
              <div key={key}>
                <h3 className="font-semibold mb-2">{label}</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {list.map((k) => (
                    <div
                      key={k.character}
                      className="p-3 border rounded-md bg-accent/20"
                    >
                      <p className="text-3xl font-bold">{k.character}</p>
                      <p className="text-sm text-muted-foreground">{k.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
