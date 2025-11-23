import { motion } from "framer-motion";
import LastKanjiLearned from "@/components/MenuPage/LastKanjiLearned";
import QuickAction from "@/components/MenuPage/QuickAction";
import NavbarApp from "@/components/Navbar/NavbarApp";
import { FiBook, FiRefreshCw, FiEdit, FiBarChart2 } from "react-icons/fi";

export default function MenuPage() {
  const fadeDown = {
    hidden: { opacity: 0, y: -40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: i * 0.2,
      },
    }),
  };

  return (
    <main className="w-full max-w-5xl mx-auto px-4 space-y-10">
      <motion.div
        custom={0}
        variants={fadeDown}
        initial="hidden"
        animate="visible"
      >
        <NavbarApp />
      </motion.div>

      <motion.div
        custom={2}
        variants={fadeDown}
        initial="hidden"
        animate="visible"
      >
        <LastKanjiLearned />
      </motion.div>

      <motion.section
        custom={3}
        variants={fadeDown}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
      >
        <QuickAction icon={<FiBook className="text-green-800"/>} label="Nuevos kanji" to="/new" />
        <QuickAction icon={<FiRefreshCw className="text-blue-800"/>} label="Recordar kanji" to="/remember" />
        <QuickAction icon={<FiEdit className="text-red-800"/>} label="Test rápido" to="/quicktest" />
        <QuickAction icon={<FiBarChart2 className="text-yellow-300"/>} label="Ver progreso" to="/progress" />
      </motion.section>
    </main>
  );
}
