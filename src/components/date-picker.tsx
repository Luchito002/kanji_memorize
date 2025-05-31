import { Control, Controller, FieldErrors, useWatch } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select"
import { FormValues } from "@/components/CustomForm"

const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
const months = Array.from({ length: 12 }, (_, i) => i + 1)

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate()
}

type Props = {
  control: Control<FormValues>
  error?: FieldErrors<FormValues>
}

export default function DatePicker({ control, error }: Props) {
  const selectedMonth = Number(useWatch({ control, name: "birthMonth" })) || 1
  const selectedYear = Number(useWatch({ control, name: "birthYear" })) || new Date().getFullYear()
  const maxDay = getDaysInMonth(selectedMonth, selectedYear)
  const days = Array.from({ length: maxDay }, (_, i) => i + 1)

  return (
    <div className="space-y-2">
      <div className="flex gap-4">
        {/* Año */}
        <div className="flex flex-col">
          <Controller
            name="birthYear"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {years.map(y => (
                      <SelectItem key={y} value={y.toString()}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {error?.birthYear && (
            <p className="mt-1 text-sm text-destructive">{error.birthYear.message}</p>
          )}
        </div>

        {/* Mes */}
        <div className="flex flex-col">
          <Controller
            name="birthMonth"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Mes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {months.map(m => (
                      <SelectItem key={m} value={m.toString()}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {error?.birthMonth && (
            <p className="mt-1 text-sm text-destructive">{error.birthMonth.message}</p>
          )}
        </div>

        {/* Día */}
        <div className="flex flex-col">
          <Controller
            name="birthDay"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Día" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {days.map(d => (
                      <SelectItem key={d} value={d.toString()}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {error?.birthDay && (
            <p className="mt-1 text-sm text-destructive">{error.birthDay.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
