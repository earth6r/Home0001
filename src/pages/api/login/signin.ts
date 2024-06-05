import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { type NextApiRequest, type NextApiResponse } from 'next'

export const config = {
  maxDuration: 300,
}

// existing user:
// curl -X POST http://localhost:3000/api/login/signin -H "Content-Type: application/json" -d '{"email":"test10@test.com","password":"password"}'

// non-existing user:
// curl -X POST http://localhost:3000/api/login/signin -H "Content-Type: application/json" -d '{"email":"test10@test.com","password":"password1"}'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG as string)

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

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
    // sign in
    const user = await signInWithEmailAndPassword(auth, email, password)
    res.status(200).json({ user, code: 'success' })
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
    if (error?.code === 'auth/wrong-password') {
      res.status(400).json({
        user: null,
        message: 'Wrong password.',
        code: 'wrong_password',
      })
      return
    }

    // @ts-expect-error error is unknown
    if (error?.code === 'auth/user-not-found') {
      res.status(400).json({
        user: null,
        message: 'User not found.',
        code: 'user_not_found',
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
