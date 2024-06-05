import { whitelistEmail } from '@/lib/constants/whitelist-emails'
import { initializeAdmin } from '@lib/firebase/admin'
import admin from 'firebase-admin'
import { type NextApiRequest, type NextApiResponse } from 'next'

export const config = {
  maxDuration: 300,
}

// existing user:
// curl -X POST http://localhost:3000/api/login/check-email-existence -H "Content-Type: application/json" -d '{"email":"apinanapinan@icloud.com"}'

// non-existing user:
// curl -X POST http://localhost:3000/api/login/check-email-existence -H "Content-Type: application/json" -d '{"email":"test@test.com"}'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY as string)

  initializeAdmin()

  const { email } = req.body

  if (!email) {
    res.status(400).json({
      message: 'Email is required.',
      request_password: false,
      code: 'email_required',
    })
    return
  }

  try {
    const user = await admin.auth().getUserByEmail(email)
    res.status(200).json({ user, request_password: false, code: 'success' })
  } catch (error: unknown) {
    // @ts-expect-error error is unknown
    if (error?.code === 'auth/user-not-found') {
      res.status(200).json({
        user: null,
        request_password: whitelistEmail.includes(email),
        code: 'user_not_found',
      })
      return
    }

    // @ts-expect-error error is unknown
    if (error?.code === 'auth/too-many-requests') {
      res.status(429).json({
        user: null,
        message: 'Too many requests.',
        request_password: false,
        code: 'too_many_requests',
      })
      return
    }

    console.error('Error checking email existence:', error)
    res.status(500).json({
      user: null,
      message: 'Internal server error.',
      request_password: false,
      code: 'internal_server_error',
    })
  }
}

export default handler
