import { z } from 'zod'

export const editSettingsLimitTodaySchema = z.object({
  daily_kanji_limit: z
    .number({
      required_error: "Debes ingresar un límite diario de kanji.",
      invalid_type_error: "El límite diario debe ser un número.",
    })
    .int("El número debe ser entero.")
    .min(1, "El límite debe ser de al menos 1 kanji por día.")
    .max(100, "El límite no puede superar los 100 kanji por día."),
})

export type EditSettingsLimitTodayValues = z.infer<typeof editSettingsLimitTodaySchema>;
