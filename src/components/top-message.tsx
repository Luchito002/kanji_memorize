import { useEffect, useState } from "react";

export interface TopMessage {
  type: "error" | "success" | "alert";
  message: string;
}

export function TopMessage({ type, message }: TopMessage) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const bgColors = {
    error: "bg-red-500",
    success: "bg-green-500",
    alert: "bg-yellow-400",
  };

  return (
    <div
      className={`fixed top-0 w-full  px-6 py-3 text-white rounded-lg shadow-lg transition-transform duration-700 ease-in-out text-center
      ${bgColors[type]} ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      {message}
    </div>
  );
}
