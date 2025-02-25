import posthog from 'posthog-js'

declare const window: any
const GOOGLE_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID

export const sendGoogleEvent = (event: string, options?: {}) => {
  if (typeof window !== 'undefined' && GOOGLE_ID) {
    window.dataLayer = window.dataLayer || []
    const isProductionSite =
      window?.location?.origin === 'https://www.home0001.com'

    window.dataLayer.push({
      event: isProductionSite ? event : 'test_' + event,
      options,
    })
    console.log('Google Event:', event, options)
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

export const disablePosthog = () => {
  if (typeof window !== 'undefined') {
    window['posthog']?.opt_out_capturing()
    posthog.opt_out_capturing()
  }
}
