import axios from 'axios'
import { useEffect } from 'react'

const WhatsAppLogin = () => {
  useEffect(() => {
    if ((window as any).FB) {
      initFBLogin()
    } else {
      ;(window as any).fbAsyncInit = initFBLogin
    }

    function initFBLogin() {
      ;(window as any).FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
        cookie: true,
        xfbml: true,
        version: 'v19.0',
      })
    }
  }, [])

  const launchWhatsAppSignup = async () => {
    ;(window as any).FB.login(
      function (response: any) {
        if (!response.authResponse) {
          console.error('User cancelled login')
          return
        }
        const code = response.authResponse.code

        // TODO: replace with some toast
        alert('please wait while we connect whatsapp')

        axios
          .post('/api/whatsapp/connect', {
            code: code,
          })
          .then(response => {
            // TODO: replace with some toast
            alert('WhatsApp Connected Successfully')
            const accessToken = response.data.access_token
            localStorage.setItem('whatsapp_access_token', accessToken)
          })
          .catch(error => {
            console.error(error)
          })
      },
      {
        scope:
          'email, whatsapp_business_management, whatsapp_business_messaging, business_management',
        return_scopes: true,
        config_id: process.env.NEXT_PUBLIC_WHATSAPP_CONFIG_ID,
        response_type: 'code',
        grant_type: 'authorization_code',
        override_default_response_type: true,
        extras: {
          setup: {},
        },
      }
    )
  }

  return (
    <>
      {localStorage.getItem('whatsapp_access_token') ? (
        <p>WhatsApp Business Account Connected</p>
      ) : (
        <button
          className="rounded-lg bg-green-400 p-3 font-normal text-lg"
          onClick={launchWhatsAppSignup}
        >
          Connect WhatsApp Business Account
        </button>
      )}
    </>
  )
}

export default WhatsAppLogin
