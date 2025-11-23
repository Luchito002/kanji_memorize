import { Outlet, useNavigate } from "react-router-dom";
import { useAuthLoader } from "@/hooks/useAuthLoader";
import { useEffect } from "react";

export default function AppLayout() {
  const navigate = useNavigate();
  const currentUser = useAuthLoader();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    if (currentUser?.rol === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [currentUser, navigate]);

  return <Outlet />;
}
