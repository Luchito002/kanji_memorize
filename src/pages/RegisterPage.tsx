import { SubmitHandler, useForm } from 'react-hook-form'
import { FormValues, registerSchema } from "@/components/CustomForm"
import InputForm from '@/components/CustomForm/CustomInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { useApi } from '@/hooks/useApi'
import { RegisterPayload, TokenResponse, UserSettingsResponse } from '@/models'
import { postRegisterUser } from '@/services/api.service'
import { useNavigate } from 'react-router-dom'
import DatePicker from '@/components/date-picker'
import { useEffect } from 'react'
import { postCreateSettings } from '@/services/apiUserSettings.service'
import { ApiResponse } from '@/types/api_response'
import LoadingAnimationSmall from '@/components/Animations/loading-animation-small'
import SuccessfullyAnimationSmall from '@/components/Animations/successfully-animation-small'
import CustomFormAuth from '@/components/AuthPages/CustomFormAuth'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { control, handleSubmit, setError, formState: { errors } } = useForm<FormValues>({
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

  const { loading, error, data, fetch: registerUserFetch } = useApi<ApiResponse<TokenResponse>, RegisterPayload>(postRegisterUser)
  const { fetch: createSettingsFetch } = useApi<ApiResponse<UserSettingsResponse>, string>(postCreateSettings)

  useEffect(() => {
    if (data) {
      navigate('/questions')
    }
    if (error?.response?.data?.message === "Username already exists") {
      setError("name", {
        type: "manual",
        message: "El nombre de usuario ya está en uso"
      })
    }
  }, [data, navigate, error, setError])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const birthdate = `${data.birthYear}-${data.birthMonth.padStart(2, "0")}-${data.birthDay.padStart(2, "0")}`
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const payload: RegisterPayload = {
      username: data.name,
      password: data.password,
      birthdate,
      timezone
    }
    const dataRegister = await registerUserFetch(payload)
    if (dataRegister.result) {
      localStorage.setItem("token", dataRegister.result.access_token);
      await createSettingsFetch(dataRegister.result.access_token)
    }
  }

  return (
    <CustomFormAuth
      onSubmit={handleSubmit(onSubmit)}
      titleForm='Registrate'
      submitButtonLabel='Registrar'
      changeFormQuestion='¿Ya tienes una cuenta?'
      changeFormButtonLabel='INICIAR SESIÓN'
      link='/login'
    >
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

      {loading && <LoadingAnimationSmall label="Registrando" />}
      {data && <SuccessfullyAnimationSmall label="Registro Completado" />}
    </CustomFormAuth>
  )
}
