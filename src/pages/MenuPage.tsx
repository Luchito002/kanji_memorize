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
        ease: [0.25, 0.1, 0.25, 1] as const,
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
        <QuickAction
          icon={<FiBook className="text-emerald-700 dark:text-emerald-300" />}
          label="Nuevos kanji"
          subtitle="Aprendé algo nuevo"
          toneClassName="bg-emerald-400/35"
          to="/new"
        />
        <QuickAction
          icon={<FiRefreshCw className="text-sky-700 dark:text-sky-300" />}
          label="Recordar kanji"
          subtitle="Repaso inteligente"
          toneClassName="bg-sky-400/35"
          to="/remember"
        />
        <QuickAction
          icon={<FiEdit className="text-rose-700 dark:text-rose-300" />}
          label="Test rápido"
          subtitle="Desafío express"
          toneClassName="bg-rose-400/35"
          to="/quicktest"
        />
        <QuickAction
          icon={<FiBarChart2 className="text-amber-700 dark:text-amber-300" />}
          label="Ver progreso"
          subtitle="Tu avance diario"
          toneClassName="bg-amber-400/35"
          to="/progress"
        />
      </motion.section>
    </main>
  );
}
