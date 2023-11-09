declare const window: any
const GOOGLE_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID

export const sendGoogleEvent = (event: string, options?: {}) => {
  if (typeof window !== 'undefined' && GOOGLE_ID) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: event,
      options,
    })
    window['google_tag_manager'][GOOGLE_ID].dataLayer.reset()
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
