import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./useRedux";
import { useApi } from "./useApi";
import { getUserMe } from "@/services/apiUser.service";
import { UserResponse } from "@/models";
import { loginSuccess } from "@/redux/states";

export function useAuthLoader() {
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const { fetch, data } = useApi<UserResponse, void>(getUserMe);

  // Si hay token y no hay user → traerlo
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !currentUser) fetch();
  }, [currentUser, fetch]);

  // Guardar user en redux
  useEffect(() => {
    if (data) dispatch(loginSuccess(data));
  }, [data, dispatch]);

  return currentUser;
}
