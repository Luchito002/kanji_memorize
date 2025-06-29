import { Outlet, useNavigate } from "react-router-dom";
import "./AppLayout.css"
import { useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";

export default function AppLayout() {
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state.user.currentUser)

  useEffect(() => {
    if (!currentUser) {
      //navigate("/login")
    }
  }, [currentUser, navigate])


  return (
    <>
      <Outlet />
    </>
  )
}
