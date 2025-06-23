import { type NextApiRequest, type NextApiResponse } from 'next'

export function setCorsHeaders(req: NextApiRequest, res: NextApiResponse) {
  const allowedOrigins = [
    'https://dashboard.home0001.com',
    'https://home0001.com',
    'https://hometrics0001.vercel.app',
  ]

  const origin = req.headers.origin

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,DELETE,PATCH,POST,PUT,OPTIONS'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  )
}
