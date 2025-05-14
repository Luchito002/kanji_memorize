import kanjiMind from "../../assets/kanjiMind.png"

export default function Explanation() {
  return (
    <div className="bg-[#110E1B] pt-1 pb-10">
      <section className="flex justify-center items-center max-w-3xl mx-auto text-left space-y-4 border-bonito p-4 px-10 gap-4 bg-[#10273B] mt-16">
        <div className="text-[#fff8f9] z-50">
          <h2 className="text-3xl font-semibold">Mnemotecnia Visual</h2>
          <p className="">
            Aprenderás Kanji mediante historias cortas, patrones visuales y asociaciones significativas. Esta técnica ayuda a recordar sin memorizar forzadamente.
          </p>
        </div>
        <img src={kanjiMind} alt="Ejemplo de mnemotecnia visual" height={180} width={180} className="rounded-xl shadow-md mx-auto z-50" />
      </section>

      <section className=" flex justify-center items-center max-w-3xl mx-auto text-right space-y-4 border-bonito p-4 px-10 gap-4 bg-[#10273B] mt-16">
        <img src={kanjiMind} alt="Ejemplo de mnemotecnia visual" height={180} width={180} className="rounded-xl shadow-md mx-auto z-50" />
        <div className="text-[#fff8f9] z-50">
          <h2 className="text-3xl font-semibold">Repetición Espaciada</h2>
          <p className="">
          Nuestro sistema te mostrará los kanji justo antes de que los olvides, reforzando tu memoria de largo plazo con sesiones breves y efectivas.
          </p>
        </div>
      </section>
    </div>
  )
}
