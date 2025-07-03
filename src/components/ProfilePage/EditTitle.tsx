import { useAppSelector } from "@/hooks/useRedux";
export default function EditTitle() {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  return (
    <h1 className="text-3xl font-semibold text-center">
      Perfil de{" "}
      <span className="text-primary font-bold">
        {currentUser?.username}
      </span>
    </h1>
  )
}
