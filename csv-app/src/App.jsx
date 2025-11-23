import React, { useState, useMemo } from 'react'
import CSVUploader from './components/CSVUploader'
import ChartView from './components/ChartView'

export default function App() {
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const [xKey, setXKey] = useState('')
  const [yKey, setYKey] = useState('')
  const [chartType, setChartType] = useState('line')

  const handleData = (parsedRows) => {
    setRows(parsedRows)
    const cols = parsedRows.length ? Object.keys(parsedRows[0]) : []
    setColumns(cols)
    if (cols.length >= 2) {
      setXKey(cols[0])
      setYKey(cols[1])
    }
  }

  const numericColumns = useMemo(() => {
    return columns.filter((c) => rows.some(r => typeof r[c] === 'number'))
  }, [columns, rows])

  return (
    <div className="app-root">
      <header className="app-header">CSV Graph Visualization</header>
      <main className="app-main">
        <aside className="panel uploader-panel">
          <CSVUploader onData={handleData} />
          <div className="controls">
            <label>Chart type
              <select value={chartType} onChange={e => setChartType(e.target.value)}>
                <option value="line">Line</option>
                <option value="bar">Bar</option>
              </select>
            </label>
            <label>X column
              <select value={xKey} onChange={e => setXKey(e.target.value)}>
                <option value="">--</option>
                {columns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label>Y column
              <select value={yKey} onChange={e => setYKey(e.target.value)}>
                <option value="">--</option>
                {columns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
          </div>
        </aside>
        <section className="panel chart-panel">
          <ChartView rows={rows} xKey={xKey} yKey={yKey} chartType={chartType} />
        </section>
      </main>
      <footer className="app-footer">Drop a CSV or paste data to visualize.</footer>
    </div>
  )
}
