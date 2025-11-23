import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link } from "react-router-dom";
import logoApp from "@/assets/logoApp.png";
import { useAppSelector } from "@/hooks/useRedux";
import { HiMenu } from "react-icons/hi";

export default function NavbarApp() {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  return (
    <nav className="w-full z-50 text-foreground shadow">
      <div className="flex justify-between items-center py-4 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <img src={logoApp} alt="Logo" width={48} height={48} />

        {/* Desktop Menu */}
        <ul className="hidden sm:flex items-center gap-6">
          <li><ModeToggle /></li>
          {currentUser ? (
            <li>
              <Link to="/profile">
                <Button variant="outline" size="xl">
                  Perfil de: <span className="font-extrabold">{currentUser?.username}</span>
                </Button>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <Button variant="outline" size="xl">Iniciar Sesión</Button>
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu */}
        <div className="sm:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <HiMenu size={24} />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="flex flex-col gap-2">
              <ModeToggle />
              {currentUser ? (
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="w-full">
                    Perfil de: <span className="font-extrabold">{currentUser?.username}</span>
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm" className="w-full">
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}
