import { Navigate, Outlet } from "react-router-dom";
import { useAuthLoader } from "@/hooks/useAuthLoader";

export default function AdminRoute() {
  const currentUser = useAuthLoader();

  // Todavía cargando
  if (!currentUser) {
    return <div>Cargando...</div>;
  }

  // No es admin
  if (currentUser.rol !== "admin") {
    return <Navigate to="/menu" replace />;
  }

  return <Outlet />;
}
