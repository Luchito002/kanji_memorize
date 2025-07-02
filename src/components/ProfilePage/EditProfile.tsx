import { useAppSelector } from "@/hooks/useRedux";
import { Button } from "../ui/button";
import InputForm from "../CustomForm/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema, EditProfileValues } from "../CustomForm";
import { SubmitHandler, useForm } from 'react-hook-form'
import DatePicker from "../date-picker";

export default function EditProfile() {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const { control, handleSubmit, formState: { errors } } = useForm<EditProfileValues>({
    resolver: zodResolver(editProfileSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      birthDay: "",
      birthMonth: "",
      birthYear: ""
    },
  })

  const onSubmit: SubmitHandler<EditProfileValues> = () => {
  };

  return (
    <form
      className="border rounded-xl p-4 space-y-4 bg-muted/30"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-xl font-semibold">Editar perfil</h2>
      <InputForm
        name="name"
        control={control}
        label="Nombre de usuario"
        type="text"
        error={errors.name}
      />

      <DatePicker<EditProfileValues>
        control={control}
        error={errors}
        year="birthYear"
        month="birthMonth"
        day="birthDay"
      />

      <p>
        <strong>Miembro desde:</strong>{" "}
        {currentUser?.created_at
          ? new Date(currentUser.created_at).toLocaleDateString()
          : "—"}
      </p>
      <Button type="submit">Guardar cambios</Button>
    </form>
  )
}
