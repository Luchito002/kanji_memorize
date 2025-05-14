import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoApp from "@/assets/logoApp.png"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full z-50 text-white absolute">
      <div className="flex justify-between items-center py-2 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <img src={logoApp} alt="Logo"  width={64} height={64} />

        {/* Desktop Menu */}
        <ul className="hidden sm:flex items-center gap-8">
          <li className="cursor-pointer">Inicio</li>
          <li><ModeToggle /></li>
          <li><Button variant="outline">Iniciar Sesión</Button></li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="sm:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="flex flex-col gap-4 items-start p-4 sm:hidden bg-white dark:bg-black border-t"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <li className="cursor-pointer w-full">Inicio</li>
            <li><ModeToggle /></li>
            <li className="w-full"><Button className="w-full">Iniciar Sesión</Button></li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
