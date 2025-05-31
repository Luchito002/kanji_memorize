import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(1, "El nombre de usuario es requerido"),
  password: z.string().min(6, "La contraseña debe contener al menos 6 caracteres"),
  confirmPassword: z.string().min(6, "La confirmación de la contraseña es requerida"),
  birthDay: z.string().min(1, "Selecciona un día"),
  birthMonth: z.string().min(1, "Selecciona un mes"),
  birthYear: z.string().min(1, "Selecciona un año"),
})
  .refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no son idénticas",
    path: ['confirmPassword']
  })
  .refine(data => {
    const { birthDay, birthMonth, birthYear } = data
    const day = parseInt(birthDay)
    const month = parseInt(birthMonth)
    const year = parseInt(birthYear)
    const isValidDate = !isNaN(day) && !isNaN(month) && !isNaN(year) &&
      new Date(year, month - 1, day).getDate() === day
    return isValidDate
  }, {
    message: "Fecha de nacimiento inválida",
    path: ['birthDay']
  })



export const loginSchema = z.object({
  name: z.string().min(1, "El nombre de usuario es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type FormValues = z.infer<typeof registerSchema>
