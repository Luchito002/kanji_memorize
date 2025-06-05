export default function WelcomeProgress() {
  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-bold text-foreground">¡Hola, ルチート!</h1>
      <p className="text-muted-foreground">
        Has aprendido <span className="text-primary font-semibold">23</span> de 103 kanji del N5
      </p>

      {/* Barra de progreso */}
      <div className="w-full bg-input rounded-full h-3">
        <div className="bg-primary h-3 rounded-full transition-all duration-500" style={{ width: '23%' }} />
      </div>

      <p className="text-sm text-muted-foreground">Última sesión: hace 2 días</p>
    </section>
  )
}
