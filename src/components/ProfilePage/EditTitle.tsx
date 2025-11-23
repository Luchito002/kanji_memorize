import { useAppSelector } from "@/hooks/useRedux";
import ButtonBack from "../button-back";
export default function EditTitle() {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  return (
    <h1 className="flex text-3xl font-semibold text-center items-center">
      <ButtonBack />
      <div className="flex-1">
        Perfil de{" "}
        <span className="text-primary font-bold">
          {currentUser?.username}
        </span>
      </div>
    </h1>
  )
}
