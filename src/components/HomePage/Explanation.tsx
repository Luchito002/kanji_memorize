import mnemotecniaExplanation from "../../assets/MnemotecniaExplanation.png"
import FSRSExplanation from "../../assets/FSRSExplanation.png"

interface SectionProps {
  title: string
  description: string[]
  imageSrc?: string
  imageAlt?: string
  bgImage: string
}

export function InfoSection({ title, description, imageSrc, imageAlt, bgImage }: SectionProps) {
  return (
    <section
      className="relative flex flex-col md:flex-row items-center justify-center min-h-screen w-full bg-cover bg-center text-white px-6 py-12"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/70 md:bg-black/80" />
      <div className="relative flex flex-col md:flex-row items-center max-w-5xl z-10 w-full space-y-6 md:space-y-0 md:space-x-8 text-center md:text-left">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{title}</h1>
          {description.map((para, i) => (
            <p key={i} className="text-white/90 leading-relaxed text-base sm:text-lg">
              {para}
            </p>
          ))}
        </div>
        {imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt || "Imagen explicativa"}
            className="w-full max-w-md lg:max-w-md xl:max-w-lg rounded-4xl shadow-lg object-contain mx-auto md:mx-0 transition-all duration-300"
          />
        )}
      </div>
    </section>
  )
}

export function NarrativeTechnique() {
  return (
    <InfoSection
      title="¿Qué es la Mnemotécnia Narrativa?"
      description={[
        "La mnemotecnia narrativa transforma el aprendizaje en una historia. En lugar de memorizar datos aislados, conectas ideas a través de una narración visual y emocional. Nuestro cerebro recuerda mejor los relatos porque despiertan imágenes, emociones y significados. Y en este caso, se utilizarán los radicales de los kanji para crear esas historias",
      ]}
      imageSrc={mnemotecniaExplanation}
      imageAlt="Explicación mnemotecnia"
      bgImage="https://images.unsplash.com/photo-1698239307081-375b3f3da4c0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172"
    />
  )
}

export function SpacedRepetition() {
  return (
    <InfoSection
      title="¿Qué es el Algoritmo de Repetición Espaciada (FSRS)?"
      description={[
        "FSRS (Free Spaced Repetition Scheduler) es un sistema que mejora tu forma de estudiar recordando cuándo olvidas. En lugar de repasar todo constantemente, FSRS calcula el mejor momento para volver a mostrarte cada información, justo antes de que la olvides.",
        "Así, aprovechas mejor tu tiempo, repasas menos y recuerdas más. El sistema aprende de ti: si recuerdas fácilmente un kanji, lo muestra menos; si te cuesta, lo repite antes."
      ]}
      imageSrc={FSRSExplanation}
      imageAlt="Explicación fsrs"
      bgImage="https://images.ctfassets.net/lzny33ho1g45/cLRkBm54hX0uNTzodbb5p/b93bc4cc42c6bfb51a8449f7f0dc957e/better-memory-00-hero.png?fm=webp&q=31&fit=thumb&w=1520&h=760"
    />
  )
}

export function TextGeneration() {
  return (
    <InfoSection
      title="¿Qué es la Generación de Texto?"
      description={[
        "La generación de texto permite que una inteligencia artificial cree contenido automáticamente. En este proyecto, se utiliza para construir historias mnemotécnicas únicas que te ayuden a recordar kanji.",
        "Gracias a esto, la aplicación crea relatos creativos y memorables, adaptados a tus gustos y preferencias, haciendo que el estudio de kanji sea más intuitivo, personal y divertido."
      ]}
      bgImage="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1920"
    />
  )
}
