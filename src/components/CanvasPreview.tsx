'use client'

import { useEffect, type RefObject } from 'react'
import { renderOG, type OGConfig } from '@/lib/ogRenderer'

interface Props {
  config: OGConfig
  canvasRef: RefObject<HTMLCanvasElement>
}

export default function CanvasPreview({ config, canvasRef }: Props) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    renderOG(canvas, config)
  }, [config, canvasRef])

  return (
    <div className="w-full overflow-hidden rounded-xl shadow-xl ring-1 ring-gray-200">
      <canvas
        ref={canvasRef}
        width={1200}
        height={630}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        aria-label="OG image preview"
      />
    </div>
  )
}
