import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { editProfileSchema, EditProfileValues } from "./";
import InputForm from "../CustomForm/CustomInput";
import DatePicker from "../date-picker";
import EditContainer from "./EditContainer";
import { useAppSelector } from "@/hooks/useRedux";
import { useApi } from "@/hooks/useApi";
import { ApiResponse } from "@/types/api_response";
import { UserEditRequest, UserResponse } from "@/models";
import { putEditUser } from "@/services/apiUser.service";
import LoadingAnimationSmall from "../Animations/loading-animation-small";
import SuccessfullyAnimationSmall from "../Animations/successfully-animation-small";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { loginSuccess } from "@/redux/states";

export default function EditProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const { fetch: editUserFetch, loading, data } = useApi<ApiResponse<UserResponse>, UserEditRequest>(putEditUser)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditProfileValues>({
    resolver: zodResolver(editProfileSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (currentUser) {
      const birthDate = currentUser.birthdate ? new Date(currentUser.birthdate) : null;

      reset({
        name: currentUser.username || "",
        birthYear: birthDate ? birthDate.getFullYear().toString() : "",
        birthMonth: birthDate ? (birthDate.getMonth() + 1).toString() : "",
        birthDay: birthDate ? birthDate.getDate().toString() : "",
      });
    }
  }, [currentUser, reset]);

  const onSubmit: SubmitHandler<EditProfileValues> = async (data) => {
    const birthdate = `${data.birthYear}-${data.birthMonth.padStart(2, "0")}-${data.birthDay.padStart(2, "0")}`
    const updatedUser = await editUserFetch({
      username: data.name,
      birthdate
    })

    if (updatedUser.result) {
      dispatch(loginSuccess(updatedUser.result));
    }
  };

  if (!currentUser) return <h1>Cargando perfil...</h1>;

  const birthDate = currentUser.birthdate ? new Date(currentUser.birthdate) : null;

  return (
    <EditContainer label="Editar Perfil" onSubmit={handleSubmit(onSubmit)} buttonLabel="Guardar Cambios">
      <InputForm
        name="name"
        control={control}
        label="Nombre de usuario"
        type="text"
        error={errors.name}
      />

      <h1>Fecha de Nacimiento</h1>
      <DatePicker<EditProfileValues>
        control={control}
        error={errors}
        year="birthYear"
        month="birthMonth"
        day="birthDay"
        defaultYear={birthDate?.getFullYear()}
        defaultMonth={birthDate ? birthDate.getMonth() + 1 : undefined}
        defaultDay={birthDate?.getDate()}
      />

      <p>
        <strong>Miembro desde:</strong>{" "}
        {currentUser.created_at
          ? new Date(currentUser.created_at).toLocaleDateString()
          : "—"}
      </p>
      {loading && <LoadingAnimationSmall label="Actualizando datos" />}
      {data && <SuccessfullyAnimationSmall label="Datos actualizados correctamente" />}
    </EditContainer>
  );
}
