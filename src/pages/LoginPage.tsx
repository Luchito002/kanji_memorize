import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValues, schema } from "@/components/CustomForm"
import InputForm from '@/components/CustomForm/CustomInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useApi } from '@/hooks/useApi';
import { RegisterPayload, RegisterResponse } from '@/models';
import { postRegisterUser } from '@/services/api.service';

export default function LoginPage() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
  })

  const { loading, error, data, fetch} = useApi<RegisterResponse, RegisterPayload>(postRegisterUser)

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const payload: RegisterPayload = {
      username: data.name,
      password: data.password
    };

    fetch(payload);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-screen w-screen flex flex-col justify-center items-center px-4"
    >
      <InputForm name='name' control={control} label='Nombre' type='text' error={errors.name} />
      <InputForm name='password' control={control} label='Contraseña' type='password' error={errors.password} />
      <InputForm name='confirmPassword' control={control} label='Confirmar contraseña' type='password' error={errors.confirmPassword} />
      {loading && <p className="text-blue-500 mb-4">Enviando...</p>}
      {error && <p className="text-red-500 mb-4">{error.message}</p>}
      {data && <p className="text-green-500 mb-4">¡Registro exitoso!</p>}
      <Button type='submit'>
        Continuar
      </Button>
    </form>
  )
}
