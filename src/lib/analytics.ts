const isDev = process.env.NODE_ENV === 'development'

export function trackEvent(name: string, properties?: Record<string, unknown>): void {
  if (isDev) console.log('[analytics]', name, properties)
  // GA4:      window.gtag('event', name, properties)
  // Plausible: window.plausible(name, { props: properties })
  // Clarity:  window.clarity('event', name)
}

export function trackPageView(url: string): void {
  if (isDev) console.log('[analytics] pageview', url)
}
