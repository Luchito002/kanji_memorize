import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/states";
import EditProfile from "@/components/ProfilePage/EditProfile";
import EditSettings from "@/components/ProfilePage/EditSettings";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-semibold">Perfil</h1>

      <div className="">
        <EditProfile />

        <EditSettings />
      </div>

      <Button variant="destructive" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </div>
  );
}
