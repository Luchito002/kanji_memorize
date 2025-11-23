interface QuickTestCardProps {
  meaning: string
  options: string[]
  onSelectOption: (option: string) => void
}

export default function QuickTestCard({
  meaning,
  options,
  onSelectOption,
}: QuickTestCardProps) {
  return (
    <div className="flex flex-col items-center gap-8 p-6 bg-card rounded-xl shadow-md w-full max-w-md mx-auto">
      {/* Kanji principal */}
      <h1 className="text-4xl font-extrabold text-kanji-foreground">{meaning}</h1>

      {/* Opciones */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelectOption(option)}
            className="
              flex items-center justify-center
              text-4xl font-bold
              bg-option-unselected-background text-kanji-foreground
              rounded-xl border border-kanji-border
              h-24
              transition-all duration-200
              hover:bg-option-unselected-hover
              dark:bg-option-unselected-background dark:hover:bg-option-unselected-hover
              cursor-pointer
            "
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
