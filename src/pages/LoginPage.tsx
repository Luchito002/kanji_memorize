import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormValues, loginSchema } from "@/components/CustomForm"
import InputForm from '@/components/CustomForm/CustomInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useApi } from '@/hooks/useApi';
import { LoginPayload, LoginResponse, UserMeResponse } from '@/models';
import { postLoginUser } from '@/services/api.service';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserMe } from '@/services/apiUser.service';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { loginSuccess } from '@/redux/states';

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const { loading, error, data, fetch } = useApi<LoginResponse, LoginPayload>(postLoginUser);
  const { fetch: fetchUser, data: userData } = useApi<UserMeResponse, void>(getUserMe);

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.access_token);
      fetchUser();
    }
  }, [data, fetchUser])

  useEffect(() => {
    if (userData) {
      dispatch(loginSuccess(userData));
      navigate("/menu");
    }
  }, [userData, dispatch, navigate]);

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    const payload: LoginPayload = {
      username: data.name,
      password: data.password,
    };

    fetch(payload);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen flex flex-col gap-4 items-center justify-center px-4 z-10"
    >
      <div>
        ¿No tienes una cuenta?
        <Link to="/register"> <Button variant="outline" size="lg">REGISTRATE</Button></Link>
      </div>

      <div className="w-full max-w-md bg-card text-card-foreground p-8 rounded-2xl shadow-md border border-border">
        <h1 className="text-2xl font-semibold mb-6 text-center">Iniciar sesión</h1>

        <div className="space-y-4">
          <InputForm name="name" control={control} label="Nombre de usuario" type="text" error={errors.name} />
          <InputForm name="password" control={control} label="Contraseña" type="password" error={errors.password} />
        </div>

        {loading && <p className="text-sm text-primary mt-4 text-center">Enviando...</p>}
        {error && <p className="text-sm text-destructive mt-4 text-center">{error.message}</p>}
        {data && <p className="text-sm text-success mt-4 text-center">¡Inicio exitoso!</p>}

        <Button type="submit" className="w-full mt-6 rounded-xl py-2 text-base font-medium">
          Continuar
        </Button>
      </div>
    </form>
  )
}
