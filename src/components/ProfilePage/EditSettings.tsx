import { useEffect, useState } from "react"
import { getUserSettings, putEditSettings } from "@/services/apiUserSettings.service"
import { useApi } from "@/hooks/useApi"
import { ApiResponse } from "@/types/api_response"
import { UserSettingsEditRequest, UserSettingsResponse } from "@/models"
import EditContainer from "./EditContainer"
import { useForm, SubmitHandler } from "react-hook-form"
import { editSettingsSchema, EditSettingsValues } from "./"
import { zodResolver } from "@hookform/resolvers/zod"
import InputForm from "../CustomForm/CustomInput"
import { CustomSelect } from "../CustomForm/CustomSelect"
import { useTheme } from "@/components/theme-provider"
import SuccessfullyAnimationSmall from "../Animations/successfully-animation-small"
import LoadingAnimationSmall from "../Animations/loading-animation-small"

export default function EditSettings() {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const { fetch: editSettingsFetch, data, loading } = useApi<ApiResponse<UserSettingsResponse>, UserSettingsEditRequest>(putEditSettings)
  const { data: userSettings } = useApi<ApiResponse<UserSettingsResponse>, null>(getUserSettings, {
    autoFetch: true,
    params: null,
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditSettingsValues>({
    resolver: zodResolver(editSettingsSchema),
    mode: "onBlur",
  })

  const { setTheme } = useTheme()

  useEffect(() => {
    if (userSettings?.result) {
      reset({
        theme: userSettings.result.theme,
        daily_kanji_limit: userSettings.result.daily_kanji_limit,
      })
    }
  }, [userSettings, reset])

  useEffect(() => {
    if (data) {
      setShowSuccess(true);
    }
    const timer = setTimeout(() => setShowSuccess(false), 3000);
    return () => clearTimeout(timer);
  }, [data])

  const onSubmit: SubmitHandler<EditSettingsValues> = async (data) => {
    await editSettingsFetch({
      theme: data.theme,
      daily_kanji_limit: data.daily_kanji_limit,
    })
  }

  if (!userSettings) return <h1>Cargando Configuraciones...</h1>

  return (
    <EditContainer
      label="Configuraciones"
      onSubmit={handleSubmit(onSubmit)}
      buttonLabel="Guardar Configuraciones"
    >
      <CustomSelect
        name="theme"
        control={control}
        label="Tema"
        options={[
          { value: "light", label: "Claro", onClick: () => setTheme("light") },
          { value: "dark", label: "Oscuro", onClick: () => setTheme("dark") },
          { value: "system", label: "Sistema", onClick: () => setTheme("system") },
        ]}
        error={errors.theme}
      />

      <InputForm
        name="daily_kanji_limit"
        control={control}
        label="Límite diario de kanji"
        type="number"
        error={errors.daily_kanji_limit}
      />

      {loading && <LoadingAnimationSmall label="Actualizando datos" />}
      {showSuccess && <SuccessfullyAnimationSmall label="Datos actualizados correctamente" />}
    </EditContainer>
  )
}
