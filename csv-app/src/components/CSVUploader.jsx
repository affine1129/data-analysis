import React, { useRef } from 'react'
import Papa from 'papaparse'

export default function CSVUploader({ onData }) {
  const fileRef = useRef(null)

  const parseFile = (file) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        onData(results.data)
      }
    })
  }

  const handleFile = (e) => {
    const f = e.target.files && e.target.files[0]
    if (f) parseFile(f)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      parseFile(e.dataTransfer.files[0])
    }
  }

  const handlePaste = (e) => {
    const text = (e.clipboardData || window.clipboardData).getData('text')
    if (!text) return
    Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => onData(results.data)
    })
  }

  return (
    <div className="csv-uploader">
      <div
        className="dropzone"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onPaste={handlePaste}
        tabIndex={0}
      >
        <p>Drop CSV here, or <button onClick={() => fileRef.current.click()}>Choose file</button>, or paste CSV</p>
        <input ref={fileRef} type="file" accept="text/csv" onChange={handleFile} style={{display: 'none'}} />
      </div>
    </div>
  )
}
