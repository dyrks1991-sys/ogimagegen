'use client'

interface ColorRowProps {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
}

function ColorRow({ id, label, value, onChange }: ColorRowProps) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor={id} className="text-sm text-gray-600 w-24 shrink-0">{label}</label>
      <div className="relative flex items-center">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded-md border border-gray-200 cursor-pointer p-0.5 bg-white"
          aria-label={`${label} color picker`}
        />
      </div>
      <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">{value}</span>
    </div>
  )
}

interface Props {
  bgColor: string
  accentColor: string
  onBgChange: (v: string) => void
  onAccentChange: (v: string) => void
}

export default function ColorPicker({ bgColor, accentColor, onBgChange, onAccentChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">Colors</label>
      <div className="space-y-3 p-3.5 bg-gray-50 rounded-lg border border-gray-100">
        <ColorRow id="bg-color"     label="Background" value={bgColor}     onChange={onBgChange} />
        <ColorRow id="accent-color" label="Accent"     value={accentColor} onChange={onAccentChange} />
      </div>
    </div>
  )
}
