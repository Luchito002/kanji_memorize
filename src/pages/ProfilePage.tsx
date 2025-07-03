import { Button } from "@/components/ui/button";
import EditProfile from "@/components/ProfilePage/EditProfile";
import EditSettings from "@/components/ProfilePage/EditSettings";
import EditTitle from "@/components/ProfilePage/EditTitle";
import { useModalContext } from "@/components/Modal/context/UseModalContext";
import LogoutModal from "@/components/ProfilePage/LogoutModal";

export default function ProfilePage() {
  const { setState } = useModalContext()

  const handleClick = () => {
    setState(true)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-8 flex flex-col ">
      <EditTitle />

      <EditProfile />

      <EditSettings />

      <Button variant="default" className="" onClick={handleClick}>
        Cerrar sesión
      </Button>

      <LogoutModal />
    </div>
  );
}
