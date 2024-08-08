import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { initMiddleware } from '@lib/next'

const PREVIEW_SECRET = process.env.SANITY_STUDIO_PREVIEW_SECRET
const STUDIO_URL = process.env.NEXT_PUBLIC_STUDIO_URL
const NEXT_URL = process.env.NEXT_PUBLIC_BASE_URL
const whitelist = [STUDIO_URL, NEXT_URL]

const cors = initMiddleware(
  Cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || (origin && whitelist.indexOf(origin) !== -1)) {
        return callback(null, true)
      }
      return callback(new Error('Not allowed by CORS'))
    },
  })
)

type ResData =
  | string
  | {
      message?: string
      error?: unknown
    }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
): Promise<void> {
  await cors(req, res)
  if (!req?.query?.secret) {
    return res.status(401).json({ message: 'No secret token' })
  }
  if (req.query.secret !== PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid secret token' })
  }
  let slug = req?.query?.slug
  if (typeof slug === 'string') {
    if (slug.charAt(0) !== '/') slug = `/${slug}`
  } else {
    console.warn('invalid slug parameter, defaulting to homepage')
    slug = '/'
  }
  // enable preview mode
  res.setDraftMode({ enable: true })
  // modify cookie to allow for iframe previews
  const cookies = res.getHeader('Set-Cookie')
  if (Array.isArray(cookies) && cookies.length > 0) {
    cookies?.forEach((cookie, index) => {
      cookies[index] = cookie.replace('SameSite=Lax', 'SameSite=None;Secure')
    })
    res.setHeader('Set-Cookie', cookies)
  }
  // if the request is to fetch return the preview html as a string
  if (req?.query?.fetch === 'true') {
    try {
      const absoluteUrl = new URL(`${NEXT_URL}${slug}`).toString()
      const previewHtml = await fetch(absoluteUrl, {
        method: 'GET',
        credentials: 'include',
      }).then(previewRes => previewRes.text())
      return res.send(previewHtml)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error fetching preview',
        error,
      })
    }
  }
  res.redirect(slug)
  res.end()
  return undefined
}
