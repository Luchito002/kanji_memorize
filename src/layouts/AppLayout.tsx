import NavbarApp from "@/components/Navbar/NavbarApp";
import { Outlet } from "react-router-dom";
import torii from "../assets/torii.svg"
import sakuras from "../assets/sakuras.svg"
import fujiDarkBig from "../assets/fuji_dark_big.svg"
import "./AppLayout.css"
import Starfield from "./Starfield";

export default function AppLayout() {
  return (
    <>
      <NavbarApp />
      <div className="dark:flex hidden absolute inset-0 -z-30 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,_#301D34_0%,_#1E151F_70%)] blur-xl" />
      </div>
      <img
        src={sakuras}
        alt="Sakuras"
        className="dark:hidden flex absolute top-20 left-0 h-[700px] -z-10 "
      />

      <img
        src={torii}
        alt="Torii"
        className="dark:hidden flex absolute right-10 top-20 w-[400px] -z-20"
      />


      <img
        src={fujiDarkBig}
        alt="Fuji dark big"
        className="dark:flex hidden fixed left-1/2 -z-20 translate-x-[-50%] w-full -bottom-25"
      />

      <Starfield />

      <Outlet />
    </>
  )
}
