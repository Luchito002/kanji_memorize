import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "./hooks/useRedux";
import { useApi } from "./hooks/useApi";
import { UserMeResponse } from "./models";
import { getUserMe } from "./services/apiUser.service";
import { loginSuccess, logout } from "./redux/states";

interface Props {
  children: ReactNode
}

export default function App({ children }: Props) {
  const dispatch = useAppDispatch();
  const { fetch, data, error } = useApi<UserMeResponse, void>(() => getUserMe());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch();
    }
  }, [fetch]);

  useEffect(() => {
    if (data) {
      dispatch(loginSuccess(data));
    } else if (error) {
      dispatch(logout());
      localStorage.removeItem("token");
    }
  }, [data, error, dispatch]);

  return (
    <>
      {children}
    </>
  );
}
