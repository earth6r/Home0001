declare const window: any

export const sendGoogleEvent = (event: string, options?: {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, { ...options })
  }
}

export const sendHubspotEvent = (event: string, value: string) => {
  if (typeof window !== undefined) {
    var _hsq = (window._hsq = window._hsq || [])

    _hsq.push([
      'trackCustomBehavioralEvent',
      {
        name: 'pe43771996_custom_click_event',
        properties: {
          item_clicked: event,
          value: value,
        },
      },
    ])
  }
}
