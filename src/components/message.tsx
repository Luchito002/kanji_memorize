import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export interface MessageProps {
  type: "error" | "alert" | "info" | "success";
  message: string;
}

export default function Message({ type, message }: MessageProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const colors = {
    error: "bg-red-500 text-white",
    alert: "bg-yellow-500 text-black",
    info: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
  }[type];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-0 right-0 px-4 py-3 rounded-lg shadow-lg ${colors} max-w-xs sm:max-w-sm md:max-w-md`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
