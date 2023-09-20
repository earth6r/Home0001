import Script from 'next/script'

const GOOGLE_ID = process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID
const FACEBOOK_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID

export const Scripts = () => {
  return (
    <>
      {GOOGLE_ID && GOOGLE_ID.length > 0 ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
    
            gtag('config', '${GOOGLE_ID}');
          `}
          </Script>
        </>
      ) : null}
      {FACEBOOK_ID && FACEBOOK_ID.length > 0 ? (
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
      ) : null}
      {HOTJAR_ID && HOTJAR_ID.length > 0 ? (
        <Script id="hotjar-analytics" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      ) : null}
    </>
  )
}

export default Scripts