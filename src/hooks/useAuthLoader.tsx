import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./useRedux";
import { useApi } from "./useApi";
import { getUserMe } from "@/services/apiUser.service";
import { UserResponse } from "@/models";
import { loginSuccess, logout } from "@/redux/states";

export function useAuthLoader() {
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const { fetch, data, error } = useApi<UserResponse, void>(getUserMe);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !currentUser) fetch();
  }, [currentUser, fetch]);

  useEffect(() => {
    if (data) dispatch(loginSuccess(data));
    if (error) {
      localStorage.removeItem("token");
      dispatch(logout());
    }
  }, [data, error, dispatch]);

  return currentUser;
}
