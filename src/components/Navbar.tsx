import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="w-full">
      <ul className="flex justify-between items-center p-2">
        <li><img src="../../public/logoApp.png" height={64} width={64} /></li>
        <li>Inicio</li>
        <li></li>
        <li>Idioma</li>
        <li><ModeToggle /></li>
        <li><Button>Iniciar Sesion</Button></li>
      </ul>
    </nav>
  )
}
