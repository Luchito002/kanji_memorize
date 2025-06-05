import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">📘 Kanji App</h2>
      <ul className="space-y-2">
        <li><NavLink to="/" className="block text-gray-700 hover:text-black">🏠 Inicio</NavLink></li>
        <li><NavLink to="/kanji-n5" className="block text-gray-700 hover:text-black">🈶 Nivel N5</NavLink></li>
        <li><NavLink to="/kanji-n4" className="block text-gray-700 hover:text-black">🈶 Nivel N4</NavLink></li>
        <li><NavLink to="/estudiar" className="block text-gray-700 hover:text-black">✍️ Estudiar</NavLink></li>
        <li><NavLink to="/tests" className="block text-gray-700 hover:text-black">🎯 Tests</NavLink></li>
        <li><NavLink to="/progreso" className="block text-gray-700 hover:text-black">📊 Progreso</NavLink></li>
        <li><NavLink to="/configuracion" className="block text-gray-700 hover:text-black">⚙️ Configuración</NavLink></li>
      </ul>
    </nav>
  );
}
