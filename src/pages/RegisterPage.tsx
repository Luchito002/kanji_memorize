import { SubmitHandler, useForm } from 'react-hook-form'
import { FormValues, registerSchema } from "@/components/CustomForm"
import InputForm from '@/components/CustomForm/CustomInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useApi } from '@/hooks/useApi'
import { RegisterPayload, TokenResponse, UserSettingsResponse } from '@/models'
import { postRegisterUser } from '@/services/api.service'
import { Link, useNavigate } from 'react-router-dom'
import DatePicker from '@/components/date-picker'
import { useEffect } from 'react'
import { postCreateSettings } from '@/services/apiUserSettings.service'
import { ApiResponse } from '@/types/api_response'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
      birthDay: "",
      birthMonth: "",
      birthYear: ""
    },
  })

  const { loading, error, data, fetch: registerUserFetch } = useApi<TokenResponse, RegisterPayload>(postRegisterUser)
  const { fetch: createSettingsFetch } = useApi<ApiResponse<UserSettingsResponse>, string>(postCreateSettings)

  useEffect(() => {
    if (data) {
      navigate('/menu')
    }
  }, [data, navigate])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const birthdate = `${data.birthYear}-${data.birthMonth.padStart(2, "0")}-${data.birthDay.padStart(2, "0")}`

    const payload: RegisterPayload = {
      username: data.name,
      password: data.password,
      birthdate
    }
    const dataRegister = await registerUserFetch(payload)
    console.log(dataRegister.access_token)
    localStorage.setItem("token", dataRegister.access_token);
    await createSettingsFetch(dataRegister.access_token)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen flex flex-col gap-4 items-center justify-center px-4"
    >
      <div>
        ¿Ya tienes una cuenta?
        <Link to="/login"> <Button variant="outline" size="lg">INICIAR SESIÓN</Button></Link>
      </div>

      <div className="w-full max-w-md bg-card text-card-foreground p-8 rounded-2xl shadow-md border border-border">
        <h1 className="text-2xl font-semibold mb-6 text-center">Regístrate</h1>

        <div className="space-y-4">
          <InputForm name="name" control={control} label="Nombre de usuario" type="text" error={errors.name} />
          <InputForm name="password" control={control} label="Contraseña" type="password" error={errors.password} />
          <InputForm name="confirmPassword" control={control} label="Confirmar contraseña" type="password" error={errors.confirmPassword} />

          <label className="block text-sm font-medium text-foreground mb-1 capitalize">Fecha de nacimiento</label>
          <DatePicker<FormValues>
            control={control}
            error={errors}
            year='birthYear'
            month='birthMonth'
            day='birthDay'
          />
        </div>

        {loading && <p className="text-sm text-primary mt-4 text-center">Enviando...</p>}
        {error && <p className="text-sm text-destructive mt-4 text-center">{error.message}</p>}
        {data && <p className="text-sm text-success mt-4 text-center">¡Registro exitoso!</p>}

        <Button type="submit" className="w-full mt-6 rounded-xl py-2 text-base font-medium">
          Registrarse
        </Button>
      </div>
    </form>
  )
}
