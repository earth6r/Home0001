import { useEffect } from 'react'
import { useRouter } from 'next/router'

// URL mapping object
const urlMapping: Record<string, string> = {
  whatsapp:
    'https://wa.me/12135771277/?text=Hi%2C%20I%27m%20interested%20in%20joining%20HOME0001',
  telegram:
    'https://t.me/Home0001_USA/?text=Hi%2C%20I%20am%20interested%20in%20joining%20HOME0001',
}

export default function RedirectPage() {
  const router = useRouter()
  const { type } = router.query

  useEffect(() => {
    if (type && typeof type === 'string') {
      const targetUrl = urlMapping[type]

      if (targetUrl) {
        router.push(targetUrl)
      } else {
        // Handle invalid type parameter
        console.error(`Invalid type parameter: ${type}`)
        router.push('/404') // or any fallback page
      }
    }
  }, [type, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-2">Redirecting...</h1>
        <p className="text-gray-600">Please wait while we redirect you.</p>
      </div>
    </div>
  )
}
