import { Outlet, useNavigate } from "react-router-dom";
import "./AppLayout.css";
import { useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { UserMeResponse } from "@/models";
import { getUserMe } from "@/services/apiUser.service";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/states";

export default function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const { fetch: fetchUser, data: userData } = useApi<UserMeResponse, void>(
    getUserMe,
    { autoFetch: false, params: undefined } // muy importante
  );

  // Si hay token y no hay currentUser, traemos el usuario
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !currentUser) {
      fetchUser();
    }
  }, [currentUser, fetchUser]);

  // Cuando se obtiene el userData, lo metemos a redux
  useEffect(() => {
    if (userData) {
      dispatch(loginSuccess(userData));
    }
  }, [userData, dispatch]);

  // Si no hay ni token ni usuario, lo mandamos a login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!currentUser && !token) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return <Outlet />;
}

