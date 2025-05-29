import { useState } from "react";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import logoApp from "@/assets/logoApp.png";
import { Link } from "react-router-dom";

export default function NavbarApp() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full z-50 fixed top-0 left-0 text-foreground shadow">
      <div className="flex justify-between items-center py-4 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <img src={logoApp} alt="Logo" width={48} height={48} />

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6">
          <li><Link to="/nuevo">Aprender</Link></li>
          <li><Link to="/armar">Practicar</Link></li>
          <li><ModeToggle /></li>
          <li><Link to="/login"><Button variant="outline" size="xl">Iniciar Sesión</Button></Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4">
            <li><Link to="/nuevo">Aprender</Link></li>
            <li><Link to="/armar">Practicar</Link></li>
            <li><ModeToggle /></li>
            <li><Button variant="outline" className="w-full">Iniciar Sesión</Button></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
