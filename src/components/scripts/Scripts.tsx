import Script from 'next/script'
import { useEffect, useState } from 'react'

const GOOGLE_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID
const FACEBOOK_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID
const HOTJAR_SV = process.env.NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION
const HUBSPOT_ID = process.env.NEXT_PUBLIC_HUBSPOT_ID
const POSTHOG_TOKEN = process.env.NEXT_PUBLIC_POSTHOG_CLIENT_API_TOKEN

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
      {POSTHOG_TOKEN && POSTHOG_TOKEN.length > 1 && analytics ? (
        <Script id="posthog-init">
          {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('${{
      POSTHOG_TOKEN,
    }}',{api_host:'https://us.i.posthog.com', person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
        })`}
        </Script>
      ) : null}
    </>
  )
}

export default Scripts
