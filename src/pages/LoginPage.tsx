import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormValues, loginSchema } from "@/components/CustomForm"
import InputForm from '@/components/CustomForm/CustomInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApi } from '@/hooks/useApi';
import { LoginPayload, TokenResponse, UserResponse } from '@/models';
import { postLoginUser } from '@/services/api.service';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserMe } from '@/services/apiUser.service';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { loginSuccess } from '@/redux/states';
import LoadingAnimationSmall from '@/components/Animations/loading-animation-small';
import SuccessfullyAnimationSmall from '@/components/Animations/successfully-animation-small';
import CustomFormAuth from '@/components/AuthPages/CustomFormAuth';
import { useAppSelector } from "@/hooks/useRedux";

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/menu")
    }
  }, [currentUser, navigate])

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({

    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const { loading, error, data, fetch } = useApi<TokenResponse, LoginPayload>(postLoginUser);
  const { fetch: fetchUser, data: userData } = useApi<UserResponse, void>(getUserMe);

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
    <CustomFormAuth
      onSubmit={handleSubmit(onSubmit)}
      titleForm='Iniciar sesión'
      submitButtonLabel='Iniciar sesión'
      changeFormQuestion='¿No tienes una cuenta?'
      changeFormButtonLabel='REGISTRATE'
      link='/register'
    >
      <InputForm name="name" control={control} label="Nombre de usuario" type="text" error={errors.name} />
      <InputForm name="password" control={control} label="Contraseña" type="password" error={errors.password} />

      {loading && <LoadingAnimationSmall label="Iniciando Sesión" />}
      {error && <p className="text-sm text-destructive mt-4 text-center">{error?.response?.data.message}</p>}
      {data && <SuccessfullyAnimationSmall label="¡Inicio exitoso!" />}
    </CustomFormAuth >
  )
}
