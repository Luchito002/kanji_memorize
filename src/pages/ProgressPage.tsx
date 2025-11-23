import { PieChart } from '@mui/x-charts/PieChart'
import { LineChart } from '@mui/x-charts/LineChart'
import useDailyFsrsProgress from '@/hooks/useDailyFsrsProgress'
import LoadingAnimation from '@/components/loading-animation'

export default function ProgressPage() {
  const { pieData, loadingPie, lineData, loadingLine } = useDailyFsrsProgress()

  if (loadingPie || !pieData) return <LoadingAnimation label="Cargando progreso" />
  if (loadingLine || !lineData) return <LoadingAnimation label="Cargando progreso" />

  const data = pieData.labels.map((label: string, index: number) => ({
    label,
    value: pieData.values[index],
    color: index === 0 ? '#00C49F' : '#0088FE',
  }))

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-12 p-6 w-full min-h-screen bg-background">
      {/* PieChart */}
      <div className="flex flex-col items-center w-full max-w-[500px] md:max-w-[600px] bg-kanji-background text-kanji-foreground p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-center">Distribución de revisión de kanji</h2>
        <p className="text-sm text-foreground mb-4 text-center">
          Este gráfico muestra cuantos kanji ya aprendiste y cuantos te faltan por aprender.
        </p>
        <PieChart
          series={[{ innerRadius: 50, outerRadius: 120, data, arcLabel: 'value' }]}
          margin={{ right: 5 }}
          width={Math.min(500, window.innerWidth - 80)}
          height={350}
          hideLegend
        />
        <div className="flex gap-4 mt-4 flex-wrap justify-center">
          {data.map((slice) => (
            <div key={slice.label} className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: slice.color }} />
              <span className="text-sm">{slice.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* LineChart */}
      <div className="w-full max-w-[700px] md:max-w-[800px] bg-kanji-background text-kanji-foreground p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-center">Progreso diario de revisión</h2>
        <p className="text-sm text-foreground mb-4 text-center">
          Este gráfico muestra la cantidad de tarjetas revisadas cada día, para que puedas seguir tu progreso a lo largo del tiempo.
        </p>

        {/* Scroll horizontal en pantallas pequeñas */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[700px]">
            <LineChart
              xAxis={[
                {
                  data: lineData.x_axis,
                  label: 'Fecha',
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: lineData.y_axis,
                  label: 'Kanji revisados',
                },
              ]}
              width={700}
              height={400}
              yAxis={[{ min: 0, max: lineData.max_y }]}
              margin={{ left: 60, right: 20, top: 20, bottom: 50 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
