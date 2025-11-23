import React, { useMemo } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export default function ChartView({ rows = [], xKey, yKey, chartType = 'line' }) {
  const chartData = useMemo(() => {
    if (!rows.length || !xKey || !yKey) return null
    const labels = rows.map(r => (r[xKey] !== undefined ? String(r[xKey]) : ''))
    const dataPoints = rows.map(r => (typeof r[yKey] === 'number' ? r[yKey] : Number(r[yKey]) || 0))
    return {
      labels,
      datasets: [
        {
          label: yKey,
          data: dataPoints,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.4)'
        }
      ]
    }
  }, [rows, xKey, yKey])

  if (!chartData) return <div className="chart-empty">Upload CSV and select X/Y columns to view chart.</div>

  return (
    <div className="chart-container">
      {chartType === 'bar' ? <Bar data={chartData} /> : <Line data={chartData} />}
    </div>
  )
}
