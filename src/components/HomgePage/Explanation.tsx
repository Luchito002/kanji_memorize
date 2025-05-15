import { useRef } from "react";
import kanjiMind from "../../assets/kanjiMind.png"
import { motion, useInView } from "framer-motion";

interface Props {
  title: string,
  description: string,
  side: 'left' | 'right',
  image: string
}

function SectionExplanation({ title, description, side, image }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <motion.section
      ref={ref}
      initial={{ x: side === 'left' ? -100 : 100, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={`flex flex-col md:flex-row ${side === 'right' ? 'md:flex-row-reverse' : ''
        } justify-center items-center max-w-3xl mx-auto text-center md:text-left gap-4 border-bonito p-4 px-10 bg-[#10273B] mt-16 z-10`}
    >
      <div className="text-[#fff8f9] z-50">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p>{description}</p>
      </div>
      <img
        src={image}
        alt="Ejemplo de mnemotecnia visual"
        height={180}
        width={180}
        className="rounded-xl shadow-md mx-auto z-50 w-40 md:w-[180px]"
      />
    </motion.section>
  );
}

export default function Explanation() {
  return (
    <div className="relative bg-[#110E1B] pt-1 pb-10 px-4 " id="about">
      <SectionExplanation
        title="Mnemotecnia Visual"
        description="Aprenderás Kanji mediante historias cortas, patrones visuales y asociaciones significativas. Esta técnica ayuda a recordar sin memorizar forzadamente."
        side="left"
        image={kanjiMind}
      />

      <SectionExplanation
        title="Repetición Espaciada"
        description="Nuestro sistema te mostrará los kanji justo antes de que los olvides, reforzando tu memoria de largo plazo con sesiones breves y efectivas."
        side="right"
        image={kanjiMind}
      />
    </div>
  )
}
