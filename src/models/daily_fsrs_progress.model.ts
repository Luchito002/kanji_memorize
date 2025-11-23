export interface PieChartResponse {
  labels: string[]
  values: number[]
}

export interface LineProgressResponse {
  x_axis: string[]
  y_axis: number[]
  max_y: number
}
