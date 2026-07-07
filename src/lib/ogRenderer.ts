import type { TemplateName } from './templates'
import { TEMPLATES } from './templates'

export interface OGConfig {
  title: string
  description: string
  template: TemplateName
  bgColor: string
  accentColor: string
  watermark: boolean
}

const W = 1200
const H = 630

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
): number {
  if (!text.trim()) return y
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = word
      if (lines.length >= maxLines) { current = ''; break }
    } else {
      current = test
    }
  }

  if (current && lines.length < maxLines) {
    // Truncate last line with ellipsis if too long
    if (ctx.measureText(current).width > maxWidth) {
      while (ctx.measureText(current + '…').width > maxWidth && current.length > 0) {
        current = current.slice(0, -1)
      }
      current += '…'
    }
    lines.push(current)
  }

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + i * lineHeight)
  }

  return y + lines.length * lineHeight
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
): void {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

export function renderOG(canvas: HTMLCanvasElement, config: OGConfig): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = W
  canvas.height = H

  const tmpl = TEMPLATES[config.template]

  // ── 1. Background ──────────────────────────────────────────────
  if (config.template === 'gradient') {
    const grad = ctx.createLinearGradient(0, 0, W, H)
    grad.addColorStop(0,   '#0f172a')
    grad.addColorStop(0.5, '#1e1b4b')
    grad.addColorStop(1,   '#0f172a')
    ctx.fillStyle = grad
  } else {
    ctx.fillStyle = config.bgColor
  }
  ctx.fillRect(0, 0, W, H)

  // ── 2. Grid lines ──────────────────────────────────────────────
  if (tmpl.showGrid) {
    ctx.strokeStyle = tmpl.gridColor
    ctx.lineWidth = 1
    for (let x = 0; x <= W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
    }
    for (let y = 0; y <= H; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
    }
  }

  // ── 3. Accent top bar ─────────────────────────────────────────
  if (config.template === 'gradient') {
    const barGrad = ctx.createLinearGradient(0, 0, W, 0)
    barGrad.addColorStop(0, 'rgba(167,139,250,0)')
    barGrad.addColorStop(0.5, 'rgba(167,139,250,0.5)')
    barGrad.addColorStop(1, 'rgba(167,139,250,0)')
    ctx.fillStyle = barGrad
    ctx.fillRect(0, 0, W, 3)
  } else {
    ctx.fillStyle = config.accentColor
    ctx.globalAlpha = 0.15
    ctx.fillRect(0, 0, W, 3)
    ctx.globalAlpha = 1
  }

  // ── 4. Logo box ────────────────────────────────────────────────
  const logoSize = 76
  const logoX = W / 2 - logoSize / 2
  const logoY = 80

  ctx.fillStyle = tmpl.logoBg
  roundRect(ctx, logoX, logoY, logoSize, logoSize, 18)
  ctx.fill()

  // Logo initials (first 2 chars of title)
  const initials = config.title.trim().replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || 'OG'
  ctx.font = `800 26px system-ui, -apple-system, Helvetica, Arial, sans-serif`
  ctx.fillStyle = tmpl.logoText
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(initials, W / 2, logoY + logoSize / 2 + 1)

  // ── 5. Title ───────────────────────────────────────────────────
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.fillStyle = config.accentColor
  ctx.font = `800 66px system-ui, -apple-system, Helvetica, Arial, sans-serif`

  const titleY = logoY + logoSize + 32
  const titleBottom = wrapText(ctx, config.title || 'Your Project Name', W / 2, titleY, 900, 80, 2)

  // ── 6. Description ─────────────────────────────────────────────
  ctx.fillStyle = tmpl.subtextColor
  ctx.font = `400 30px system-ui, -apple-system, Helvetica, Arial, sans-serif`

  const descY = titleBottom + 20
  wrapText(ctx, config.description || 'Open Graph image generator', W / 2, descY, 820, 44, 2)

  // ── 7. Watermark ───────────────────────────────────────────────
  if (config.watermark) {
    ctx.fillStyle = config.template === 'light'
      ? 'rgba(0,0,0,0.18)'
      : 'rgba(255,255,255,0.18)'
    ctx.font = `400 16px system-ui, -apple-system, Helvetica, Arial, sans-serif`
    ctx.textAlign = 'right'
    ctx.textBaseline = 'bottom'
    ctx.fillText('ogimagegen.vercel.app', W - 36, H - 26)
  }
}
