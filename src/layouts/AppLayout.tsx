import NavbarApp from "@/components/Navbar/NavbarApp";
import { Outlet } from "react-router-dom";
import sakura from "../assets/sakura.svg"
import fujiDarkSmall from "../assets/fuji_dark_small.svg"
import "./AppLayout.css"
import Starfield from "./Starfield";

export default function AppLayout() {
  return (
    <>
      <NavbarApp />
      <img
        src={sakura}
        alt="Sakuras"
        className="dark:hidden flex fixed bottom-10 left-10 h-[200px] -z-10"
      />

      <img
        src={sakura}
        alt="Sakuras"
        className="dark:hidden flex fixed top-20 right-0 h-[250px] -z-10"
      />
      <div className="dark:hidden flex absolute inset-0 -z-30 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,_white_0%,_#FFEAEA_40%)] blur-3xl" />
      </div>
      <img
        src={fujiDarkSmall}
        alt="Fuji dark big"
        className="dark:flex hidden fixed left-1/2 -z-20 translate-x-[-50%] w-full h-[40rem] -bottom-20"
      />
      <span
        className="dark:flex hidden fixed h-[13rem] w-full bg-background -bottom-20"
      />
      <div className="dark:flex hidden fixed inset-0 -z-30 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,_#301D34_0%,_#1E151F_70%)] blur-xl" />
      </div>
      <Starfield />

      <Outlet />
    </>
  )
}
