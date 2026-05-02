import { PieChart } from '@mui/x-charts/PieChart'
import { LineChart } from '@mui/x-charts/LineChart'
import { Link } from 'react-router-dom'
import useDailyFsrsProgress from '@/hooks/useDailyFsrsProgress'
import LoadingAnimation from '@/components/loading-animation'
import { Button } from '@/components/ui/button'

export default function ProgressPage() {
  const { pieData, loadingPie, lineData, loadingLine } = useDailyFsrsProgress()

  if (loadingPie || !pieData) return <LoadingAnimation label="Cargando progreso" />
  if (loadingLine || !lineData) return <LoadingAnimation label="Cargando progreso" />

  const data = pieData.labels.map((label: string, index: number) => ({
    label,
    value: pieData.values[index],
    color: index === 0 ? '#00C49F' : '#0088FE',
  }))

  const chartSx = {
    '& .MuiChartsAxis-tickLabel': { fill: 'var(--foreground)' },
    '& .MuiChartsAxis-label': { fill: 'var(--foreground)' },
    '& .MuiChartsAxis-line': { stroke: 'var(--muted-foreground)' },
    '& .MuiChartsAxis-tick': { stroke: 'var(--muted-foreground)' },
    '& .MuiChartsGrid-line': { stroke: 'var(--border)' },
    '& .MuiLineElement-root': { stroke: 'var(--primary)', strokeWidth: 3 },
    '& .MuiMarkElement-root': { fill: 'var(--primary)', stroke: 'var(--primary)' },
    '& .MuiChartsLegend-root text': { fill: 'var(--foreground)' },
    '& .MuiChartsTooltip-root': {
      backgroundColor: 'var(--card)',
      color: 'var(--foreground)',
      border: '1px solid var(--border)',
    },
  }

  return (
    <div className="w-full min-h-screen bg-background p-6">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link to="/menu">Regresar al menú</Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12 w-full">
        {/* PieChart */}
        <div className="flex flex-col items-center w-full max-w-125 md:max-w-150 bg-kanji-background text-kanji-foreground p-6 rounded-2xl shadow-lg">
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
          sx={{
            '& .MuiPieArcLabel-root': { fill: 'var(--foreground)' },
          }}
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
        <div className="w-full max-w-175 md:max-w-200 bg-kanji-background text-kanji-foreground p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2 text-center">Progreso diario de revisión</h2>
          <p className="text-sm text-foreground mb-4 text-center">
            Este gráfico muestra la cantidad de tarjetas revisadas cada día, para que puedas seguir tu progreso a lo largo del tiempo.
          </p>

          {/* Scroll horizontal en pantallas pequeñas */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-175">
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
                  color: 'var(--primary)',
                },
              ]}
              width={700}
              height={400}
              yAxis={[{ min: 0, max: lineData.max_y }]}
              margin={{ left: 60, right: 20, top: 20, bottom: 50 }}
              sx={chartSx}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
