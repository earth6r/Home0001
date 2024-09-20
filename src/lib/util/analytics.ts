declare const window: any
const GOOGLE_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID

export const sendGoogleEvent = (event: string, options?: {}) => {
  if (typeof window !== 'undefined' && GOOGLE_ID) {
    window.dataLayer = window.dataLayer || []
    const isProductionSite =
      window?.location?.origin === 'https://www.home0001.com'

    window.dataLayer.push({
      event: 'beta_' + event,
      options,
    })
    window['google_tag_manager'][GOOGLE_ID].dataLayer.reset()
  }
}

export const disableGoogleEvents = () => {
  if (typeof window !== 'undefined' && GOOGLE_ID) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push('js', new Date())

    window[`ga-disable-${GOOGLE_ID}`] = true
    window.dataLayer.push('config', GOOGLE_ID)
  }
}
