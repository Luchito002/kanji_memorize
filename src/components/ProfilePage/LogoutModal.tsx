import { useEffect } from "react";
import Modal from "../Modal/Modal";
import { useModalContext } from "../Modal/context/UseModalContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/states";
import { Button } from "../ui/button";

export default function LogoutModal() {
  const { setState } = useModalContext()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    setState(false)
  }, [setState])

  return (
    <Modal>
      <div className="bg-background p-6 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6">
        <h1 className="text-xl font-semibold">
          ¿Estás seguro de cerrar sesión?
        </h1>
        <div className="flex justify-center gap-4">
          <Button onClick={handleLogout} variant="destructive">
            Cerrar sesión
          </Button>
          <Button onClick={() => setState(false)} variant="secondary">
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  )
}
