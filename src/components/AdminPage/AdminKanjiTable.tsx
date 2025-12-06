import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AllUsersGroupedJLPTResponse, UserGroupedJLPT } from "@/models/daily_fsrs_progress.model"
import Input from "@mui/material/Input"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { useModalContext } from "@/components/Modal/context/UseModalContext"
import AdminKanjiLearnedDetailsModal from "./AdminKanjiLearnedDetailsModal"

interface AdminKanjiTableProps {
  data: AllUsersGroupedJLPTResponse
}

export default function AdminKanjiTable({ data }: AdminKanjiTableProps) {
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState<UserGroupedJLPT | null>(null)

  const { setState } = useModalContext()

  const rows = useMemo(() => {
    return data.results.map((user: UserGroupedJLPT) => {
      const { data: kanjiData } = user

      const n1Count = kanjiData.n1.length
      const n2Count = kanjiData.n2.length
      const n3Count = kanjiData.n3.length
      const n4Count = kanjiData.n4.length
      const n5Count = kanjiData.n5.length
      const total = kanjiData.learned_count

      let highestLevel = "N/A"
      if (n1Count > 0) highestLevel = "N1"
      else if (n2Count > 0) highestLevel = "N2"
      else if (n3Count > 0) highestLevel = "N3"
      else if (n4Count > 0) highestLevel = "N4"
      else if (n5Count > 0) highestLevel = "N5"

      return {
        rawUser: user,
        username: user.username,
        n1: n1Count,
        n2: n2Count,
        n3: n3Count,
        n4: n4Count,
        n5: n5Count,
        total,
        highestLevel,
      }
    })
  }, [data])

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      row.username.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, rows])

  return (
    <div className="rounded-lg shadow-sm border border-border bg-[#fff8f0] dark:bg-[#1a1a1a] p-4 space-y-4">

      {/* BUSCADOR */}
      <Input
        placeholder="Buscar por nombre de usuario..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-xl bg-input text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all border-border"
      />


      <Table>
        <TableCaption className="text-muted-foreground">
          Kanji aprendidos por usuario según nivel JLPT
        </TableCaption>

        <TableHeader className="bg-muted/60">
          <TableRow className="hover:bg-transparent">
            <TableHead>Estudiante</TableHead>
            <TableHead className="text-center">N5</TableHead>
            <TableHead className="text-center">N4</TableHead>
            <TableHead className="text-center">N3</TableHead>
            <TableHead className="text-center">N2</TableHead>
            <TableHead className="text-center">N1</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-center">Detalles</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.username} className="hover:bg-muted transition-colors">
              <TableCell>{row.username}</TableCell>
              <TableCell className="text-center">{row.n5}</TableCell>
              <TableCell className="text-center">{row.n4}</TableCell>
              <TableCell className="text-center">{row.n3}</TableCell>
              <TableCell className="text-center">{row.n2}</TableCell>
              <TableCell className="text-center">{row.n1}</TableCell>
              <TableCell className="text-right font-medium text-green-800">{row.total}</TableCell>

              {/* BOTÓN PARA ABRIR MODAL */}
              <TableCell className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedUser(row.rawUser)
                    setState(true)
                  }}
                >
                  Ver
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {filteredRows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center text-muted-foreground py-6"
              >
                No se encontraron usuarios con ese nombre.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* MODAL */}
      {selectedUser && (
        <AdminKanjiLearnedDetailsModal
          detail={selectedUser.data}
          username={selectedUser.username}
          onClose={() => {
            setSelectedUser(null)
            setState(false)
          }}
        />
      )}
    </div>
  )
}
