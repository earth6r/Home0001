import Script from 'next/script'
import { useEffect, useState } from 'react'

const GOOGLE_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID
const FACEBOOK_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID
const HOTJAR_SV = process.env.NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION
const HUBSPOT_ID = process.env.NEXT_PUBLIC_HUBSPOT_ID

const isInUkOrEu = (countryCode: string): boolean => {
  const ukEuCountries: Set<string> = new Set([
    'UK',
    'IE',
    'DE',
    'FR',
    'IT',
    'ES',
    'NL',
    'BE',
    'LU',
    'AT',
    'SE',
    'DK',
    'FI',
    'PT',
    'GR',
    'CZ',
    'HU',
    'PL',
    'SK',
    'SI',
    'EE',
    'LV',
    'LT',
    'CY',
    'MT',
    'RO',
    'BG',
    'HR',
  ])
  return ukEuCountries.has(countryCode.toUpperCase())
}

export const Scripts = () => {
  const [analytics, setAnalytics] = useState(false)

  const fetchCountryCode = async (): Promise<string> => {
    try {
      const response = await fetch('https://ipapi.co/country/')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const countryCode = await response.text()
      return countryCode
    } catch (error) {
      console.error('Error fetching country code:', error)
      return 'US'
    }
  }

  const enableAnalytics = (countryCode: string): void => {
    if (!isInUkOrEu(countryCode)) {
      if (sessionStorage.getItem('allowAnalytics') !== 'false') {
        setAnalytics(true)
      }
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchCountryCode().then(enableAnalytics)
    }
  }, [])

  return (
    <>
      {GOOGLE_ID && GOOGLE_ID.length > 0 && analytics ? (
        <>
          <Script id="google-analytics" strategy="afterInteractive">
            <noscript>
              <div style={{ display: 'none', visibility: 'hidden' }}>
                <iframe
                  src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_ID}`}
                  height="0"
                  width="0"
                ></iframe>
              </div>
            </noscript>
          </Script>
        </>
      ) : null}
      {/* {FACEBOOK_ID && FACEBOOK_ID.length > 0 && analytics ? (
        <Script id="facebook-pixel-analytics" strategy="afterInteractive">
          {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FACEBOOK_ID}');
            `}
        </Script>
      ) : null} */}
      {HOTJAR_ID && HOTJAR_ID.length > 0 && analytics ? (
        <Script id="hotjar-analytics" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=${HOTJAR_SV}');
          `}
        </Script>
      ) : null}
      {HUBSPOT_ID && HUBSPOT_ID.length > 0 && analytics ? (
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src={`//js.hs-scripts.com/${HUBSPOT_ID}.js`}
        ></script>
      ) : null}
      <Script src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js" />
    </>
  )
}

export default Scripts
