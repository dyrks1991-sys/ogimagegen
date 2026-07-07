'use client'

import { useState, type RefObject } from 'react'
import { downloadBlob, generateFilename } from '@/lib/download'
import { trackEvent } from '@/lib/analytics'

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>
}

export default function DownloadButton({ canvasRef }: Props) {
  const [downloading, setDownloading] = useState(false)

  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas || downloading) return

    setDownloading(true)
    trackEvent('download')

    canvas.toBlob(
      (blob) => {
        if (blob) {
          downloadBlob(blob, generateFilename())
        } else {
          // Fallback for browsers where toBlob returns null
          const dataUrl = canvas.toDataURL('image/png')
          const a = document.createElement('a')
          a.href = dataUrl
          a.download = generateFilename()
          a.click()
        }
        setTimeout(() => setDownloading(false), 600)
      },
      'image/png',
    )
  }

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
      aria-label="Download OG image as PNG"
    >
      {downloading ? (
        <>
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Preparing…
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PNG
        </>
      )}
    </button>
  )
}
