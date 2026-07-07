'use client'

import type { TemplateName } from '@/lib/templates'

interface Props {
  selected: TemplateName
  onSelect: (t: TemplateName) => void
}

const PREVIEWS: { name: TemplateName; label: string; bg: string; text: string; bar: string }[] = [
  { name: 'dark',     label: 'Dark',     bg: '#111827', text: '#ffffff', bar: '#ffffff' },
  { name: 'light',    label: 'Light',    bg: '#ffffff', text: '#111827', bar: '#111827' },
  { name: 'gradient', label: 'Gradient', bg: 'linear-gradient(135deg,#0f172a,#1e1b4b)', text: '#ffffff', bar: '#a78bfa' },
]

export default function TemplateSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Template">
        {PREVIEWS.map((t) => {
          const isActive = selected === t.name
          return (
            <button
              key={t.name}
              role="radio"
              aria-checked={isActive}
              onClick={() => onSelect(t.name)}
              className={`relative flex flex-col overflow-hidden rounded-lg border-2 transition-all ${
                isActive
                  ? 'border-gray-900 shadow-md scale-[1.02]'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              {/* Mini canvas preview */}
              <div
                className="h-12 w-full flex items-center justify-center"
                style={{ background: t.bg }}
              >
                <div className="space-y-1 w-10">
                  <div className="h-1.5 rounded-full" style={{ background: t.bar, opacity: 0.9 }} />
                  <div className="h-1 rounded-full" style={{ background: t.text, opacity: 0.4 }} />
                </div>
              </div>
              {/* Label */}
              <div className={`py-1.5 text-center text-xs font-medium ${
                isActive ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-600'
              }`}>
                {t.label}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
