import { initializeAdmin } from '@lib/firebase/admin'
import admin from 'firebase-admin'
import { type NextApiRequest, type NextApiResponse } from 'next'

export const config = {
  maxDuration: 300,
}

// curl -X POST http://localhost:3000/api/login/set-password -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"password"}'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  initializeAdmin()

  const db = admin.firestore()

  const { email, password } = req.body

  if (!email) {
    res
      .status(400)
      .json({ message: 'Email is required.', code: 'email_required' })
    return
  }

  if (!password) {
    res
      .status(400)
      .json({ message: 'Password is required.', code: 'password_required' })
    return
  }

  try {
    // create a new user
    const response = await admin.auth().createUser({
      email,
      password,
    })
    await db.collection('users').doc(response.uid).set({
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    res.status(200).json({ user: response, code: 'success' })
  } catch (error: unknown) {
    // @ts-expect-error error is unknown
    if (error?.code === 'auth/too-many-requests') {
      res.status(429).json({
        user: null,
        message: 'Too many requests.',
        code: 'too_many_requests',
      })
      return
    }

    // @ts-expect-error error is unknown
    if (error?.code === 'auth/email-already-exists') {
      res.status(400).json({
        user: null,
        message: 'Email already exists.',
        code: 'email_already_exists',
      })
      return
    }

    console.error('Error setting password:', error)
    res.status(500).json({
      user: null,
      message: 'Internal server error.',
      code: 'internal_server_error',
    })
  }
}

export default handler
