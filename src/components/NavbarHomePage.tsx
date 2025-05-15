//import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import logoApp from "@/assets/logoApp.png"

export default function NavbarHomePage() {
  return (
    <nav className="w-full z-50 text-white absolute py-4">
      <div className="flex justify-between items-center py-2 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <img src={logoApp} alt="Logo" width={64} height={64} />

        {/* Desktop Menu */}
        <ul className="flex items-center gap-8">
          <li className="cursor-pointer"><a href="#about">Acerca</a></li>
          {/* <li><ModeToggle /></li> */}
          <li><Button variant="outline" size="xl">Iniciar Sesión</Button></li>
        </ul>

      </div>
    </nav>
  );
}
