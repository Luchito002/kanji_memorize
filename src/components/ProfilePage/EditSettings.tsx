import { useState } from "react";
import { Button } from "../ui/button";

export default function EditSettings() {
  // Supongamos que también ya tienes estos valores desde la API
  const [theme, setTheme] = useState("system");
  const [dailyKanjiLimit, setDailyKanjiLimit] = useState(20);

  const handleSettingsUpdate = () => {
    console.log("Actualizando ajustes:", {
      theme,
      daily_kanji_limit: dailyKanjiLimit,
    });
    // Aquí llamas al backend para actualizar los settings
  };
  return (
    <div className="border rounded-xl p-4 space-y-4">
      <h2 className="text-xl font-semibold">Configuraciones</h2>

      <div>
        <label className="block mb-1 font-medium">Tema</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="system">Sistema</option>
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Límite diario de kanji</label>
        <input
          type="number"
          min={1}
          max={200}
          className="w-full border rounded px-3 py-2"
          value={dailyKanjiLimit}
          onChange={(e) => setDailyKanjiLimit(parseInt(e.target.value))}
        />
      </div>

      <Button onClick={handleSettingsUpdate}>Guardar configuraciones</Button>
    </div>
  )
}
