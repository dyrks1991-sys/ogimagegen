export type TemplateName = 'dark' | 'light' | 'gradient'

export interface TemplateConfig {
  name: TemplateName
  label: string
  bgColor: string
  accentColor: string
  textColor: string
  subtextColor: string
  gridColor: string
  logoBg: string
  logoText: string
  showGrid: boolean
}

export const TEMPLATES: Record<TemplateName, TemplateConfig> = {
  dark: {
    name: 'dark',
    label: 'Dark',
    bgColor: '#111827',
    accentColor: '#ffffff',
    textColor: '#ffffff',
    subtextColor: 'rgba(255,255,255,0.55)',
    gridColor: 'rgba(255,255,255,0.04)',
    logoBg: '#ffffff',
    logoText: '#111827',
    showGrid: true,
  },
  light: {
    name: 'light',
    label: 'Light',
    bgColor: '#ffffff',
    accentColor: '#111827',
    textColor: '#111827',
    subtextColor: '#6b7280',
    gridColor: 'rgba(0,0,0,0.04)',
    logoBg: '#111827',
    logoText: '#ffffff',
    showGrid: true,
  },
  gradient: {
    name: 'gradient',
    label: 'Gradient',
    bgColor: '#0f172a',
    accentColor: '#a78bfa',
    textColor: '#ffffff',
    subtextColor: 'rgba(255,255,255,0.6)',
    gridColor: 'rgba(255,255,255,0.04)',
    logoBg: 'rgba(255,255,255,0.12)',
    logoText: '#ffffff',
    showGrid: true,
  },
}
