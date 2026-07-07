'use client'

interface Props {
  title: string
  description: string
  onTitleChange: (v: string) => void
  onDescriptionChange: (v: string) => void
}

export default function TextInputs({ title, description, onTitleChange, onDescriptionChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="og-title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <span className={`text-xs tabular-nums ${title.length > 70 ? 'text-amber-500' : 'text-gray-400'}`}>
            {title.length}/80
          </span>
        </div>
        <input
          id="og-title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value.slice(0, 80))}
          placeholder="Your Project Name"
          className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="og-desc" className="block text-sm font-medium text-gray-700">
            Description
            <span className="ml-1.5 text-xs font-normal text-gray-400">optional</span>
          </label>
          <span className={`text-xs tabular-nums ${description.length > 100 ? 'text-amber-500' : 'text-gray-400'}`}>
            {description.length}/120
          </span>
        </div>
        <input
          id="og-desc"
          type="text"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value.slice(0, 120))}
          placeholder="The best tool for developers."
          className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
        />
      </div>
    </div>
  )
}
