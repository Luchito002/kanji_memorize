export default function Footer() {
  return (
    <footer
      className="relative w-full bg-black text-gray-300 py-12 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url(https://wallpapers.com/images/hd/cool-japanese-kanji-lanterns-izdbu9u0unulw5sg.jpg)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-wide text-white">Kanmori</h3>

        <p className="text-xs text-gray-400 text-center md:text-right">
          © {new Date().getFullYear()} <span className="font-semibold text-white">Kanmori</span>. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
