import { Theme } from '@/types/user_settings'
import { z } from 'zod'

export const editProfileSchema = z.object({
  name: z.string().min(1, "El nombre de usuario es requerido"),
  birthDay: z.string().min(1, "Selecciona un día"),
  birthMonth: z.string().min(1, "Selecciona un mes"),
  birthYear: z.string().min(1, "Selecciona un año"),
});

export const editSettingsSchema = z.object({
  theme: z.enum([Theme.Light, Theme.Dark, Theme.System], {
    required_error: "El tema es obligatorio.",
    invalid_type_error: "El tema seleccionado no es válido.",
  }),
  daily_kanji_limit: z
    .number({
      required_error: "Debes ingresar un límite diario de kanji.",
      invalid_type_error: "El límite diario debe ser un número.",
    })
    .int("El número debe ser entero.")
    .min(10, "El límite debe ser de al menos 10 kanji por día.")
    .max(100, "El límite no puede superar los 100 kanji por día."),
})

export type EditSettingsValues = z.infer<typeof editSettingsSchema>;
export type EditProfileValues = z.infer<typeof editProfileSchema>;
