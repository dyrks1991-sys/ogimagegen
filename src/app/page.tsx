'use client'

import { useRef, useState, useCallback } from 'react'
import type { OGConfig } from '@/lib/ogRenderer'
import { TEMPLATES } from '@/lib/templates'
import type { TemplateName } from '@/lib/templates'
import { trackEvent } from '@/lib/analytics'
import TextInputs from '@/components/TextInputs'
import TemplateSelector from '@/components/TemplateSelector'
import ColorPicker from '@/components/ColorPicker'
import CanvasPreview from '@/components/CanvasPreview'
import DownloadButton from '@/components/DownloadButton'

const DEFAULT_CONFIG: OGConfig = {
  title: 'Your Project Name',
  description: 'The best tool for developers.',
  template: 'dark',
  bgColor: '#111827',
  accentColor: '#ffffff',
  watermark: true,
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [config, setConfig] = useState<OGConfig>(DEFAULT_CONFIG)

  const update = useCallback((patch: Partial<OGConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }))
  }, [])

  function handleTemplateChange(t: TemplateName) {
    const tmpl = TEMPLATES[t]
    setConfig((prev) => ({
      ...prev,
      template: t,
      bgColor: tmpl.bgColor,
      accentColor: tmpl.accentColor,
    }))
    trackEvent('template_selected', { template: t })
  }

  function handleBgChange(v: string) {
    update({ bgColor: v })
    trackEvent('color_changed', { type: 'bg', value: v })
  }

  function handleAccentChange(v: string) {
    update({ accentColor: v })
    trackEvent('color_changed', { type: 'accent', value: v })
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gray-900 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-black tracking-tight">OG</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm">OGImageGen</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-xs text-gray-400">Free · Instant · Private</span>
            <a
              href="https://github.com/dyrks1991-sys/ogimagegen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 leading-tight">
            Generate OG images.<br className="hidden sm:block" />
            <span className="text-gray-400"> In seconds.</span>
          </h1>
          <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-md mx-auto">
            Beautiful 1200×630 cards for Twitter, LinkedIn, Slack, and beyond. No upload. No account. Completely free.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400">
            {['3 Templates', 'Custom Colors', '1200×630 PNG', 'Works offline'].map((f) => (
              <span key={f} className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1">
                <span className="text-gray-500">✓</span> {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main tool */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 animate-fade-in">

          {/* Left — Controls */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0 space-y-6 order-2 lg:order-1">
            <TextInputs
              title={config.title}
              description={config.description}
              onTitleChange={(v) => update({ title: v })}
              onDescriptionChange={(v) => update({ description: v })}
            />
            <TemplateSelector selected={config.template} onSelect={handleTemplateChange} />
            <ColorPicker
              bgColor={config.bgColor}
              accentColor={config.accentColor}
              onBgChange={handleBgChange}
              onAccentChange={handleAccentChange}
            />
            <div className="flex items-center gap-2">
              <input
                id="watermark"
                type="checkbox"
                checked={config.watermark}
                onChange={(e) => update({ watermark: e.target.checked })}
                className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <label htmlFor="watermark" className="text-sm text-gray-600">
                Show watermark
                <span className="ml-1.5 text-xs text-gray-400">(free)</span>
              </label>
            </div>
          </aside>

          {/* Right — Preview + Download */}
          <div className="flex-1 min-w-0 space-y-4 order-1 lg:order-2">
            <CanvasPreview config={config} canvasRef={canvasRef} />
            <div className="flex items-center justify-between text-xs text-gray-400 px-0.5">
              <span>1200 × 630 pixels · PNG</span>
              <span>Twitter · LinkedIn · Slack · Discord</span>
            </div>
            <DownloadButton canvasRef={canvasRef} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>OGImageGen — Free Open Graph Image Generator</span>
          <div className="flex items-center gap-4">
            <span>No upload · No account · Private</span>
            <a href="https://github.com/dyrks1991-sys/ogimagegen" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">Open source</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
