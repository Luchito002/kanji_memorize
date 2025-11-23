import { createContext, useContext, useState, ReactNode } from 'react'

interface RememberKanjiContextType {
  writeTimeSec: number | null
  setWriteTimeSec: (value: number) => void
  strokeErrors: number | null
  setStrokeErrors: (value: number) => void
}

const RememberKanjiContext = createContext<RememberKanjiContextType | undefined>(undefined)

export const RememberKanjiProvider = ({ children }: { children: ReactNode }) => {
  const [writeTimeSec, setWriteTimeSec] = useState<number | null> (null)
  const [strokeErrors, setStrokeErrors] = useState<number | null>(null)

  return (
    <RememberKanjiContext.Provider
      value={{ writeTimeSec, setWriteTimeSec, strokeErrors, setStrokeErrors }}
    >
      {children}
    </RememberKanjiContext.Provider>
  )
}

// Custom hook para acceder fácilmente al contexto
export const useRememberKanji = () => {
  const context = useContext(RememberKanjiContext)
  if (!context) {
    throw new Error('useRememberKanji must be used within a RememberKanjiProvider')
  }
  return context
}
