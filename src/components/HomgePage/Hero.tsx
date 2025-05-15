import { Button } from "@/components/ui/button";
import muchosKanji from '../../assets/muchosKanji.jpg'
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div
      className="flex items-center justify-center h-screen w-full bg-black bg-cover bg-center bg-no-repeat z-10"
      style={{ backgroundImage: `url(${muchosKanji})` }}
    >
      <div className="absolute inset-0 bg-black/85 z-0" />

      <section className="relative z-10 max-w-4xl mx-auto space-y-6 rounded-xl p-6">
        <motion.h1
          className="text-6xl font-bold tracking-tight text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Aprende Kanji de forma visual e intuitiva
        </motion.h1>

        <motion.p
          className="text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Descubre la belleza del kanji combinando historias e imágenes mentales.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link to="/nuevo">
            <Button variant="outline" size="xl" className="gap-2 text-white border-white hover:bg-white/10">
              <Sparkles className="h-5 w-5" />
              Comenzar a aprender
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
