import { useEffect } from "react";
import Modal from "../Modal/Modal";
import { useModalContext } from "../Modal/context/UseModalContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import InputForm from "../CustomForm/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { editSettingsLimitTodaySchema, EditSettingsLimitTodayValues } from "./new-kanji.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useApi } from "@/hooks/useApi";
import { ApiResponse } from "@/types/api_response";
import { putIncreaseEndKanjiIndex } from "@/services/apiDailyProgress.service";
import { incrementKanjiCount } from "@/services/apiFsrs.service";
import { IncrementKanjiCountRequest } from "@/models/srs.model";

interface Props {
  which: 'new_kanji' | 'fsrs_kanji'
}

export default function IncreaseLimitKanjiModal({ which }: Props) {
  const { setState } = useModalContext()

  const navigate = useNavigate();

  const { fetch } = useApi<ApiResponse<null>, number>(putIncreaseEndKanjiIndex)
  const { fetch: incrementKanjiCountFetch } = useApi<ApiResponse<null>, IncrementKanjiCountRequest>(incrementKanjiCount)

  useEffect(() => {
    setState(false)
  }, [setState])

  const { control, handleSubmit, formState: { errors } } = useForm<EditSettingsLimitTodayValues>({
    resolver: zodResolver(editSettingsLimitTodaySchema),
    mode: "onBlur",
    defaultValues: { daily_kanji_limit: 1 }
  })

  const onSubmit: SubmitHandler<EditSettingsLimitTodayValues> = async (data) => {
    if (which === "new_kanji") await fetch(data.daily_kanji_limit)
    if (which === "fsrs_kanji") await incrementKanjiCountFetch({ increment: data.daily_kanji_limit })
    navigate(0)
  };

  return (
    <Modal>
      <form
        className="bg-background p-6 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl font-semibold">
          Aumentar el límite de kanji por hoy
        </h1>

        <InputForm name="daily_kanji_limit" control={control} label="cantidad" type="number" error={errors.daily_kanji_limit} />

        <div className="flex justify-center gap-4">
          <Button type="submit" variant="destructive">
            Aumentar
          </Button>
          <Button onClick={() => setState(false)} variant="secondary">
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
