import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore/lite'

import { type NextApiRequest, type NextApiResponse } from 'next'

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route in seconds
}

// API route handler for signing in a user
// existing user:
// curl -X POST http://localhost:3000/api/login/signin -H "Content-Type: application/json" -d '{"email":"test10@test.com","password":"password"}'
// non-existing user:
// curl -X POST http://localhost:3000/api/login/signin -H "Content-Type: application/json" -d '{"email":"test10@test.com","password":"password1"}'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Parse Firebase configuration from environment variables
  const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG as string)

  // Initialize Firebase app with the parsed configuration
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const db = getFirestore(app)

  // Extract email and password from the request body
  const { email, password } = req.body

  // Check if email is provided
  if (!email) {
    res
      .status(400)
      .json({ message: 'Email is required.', code: 'email_required' })
    return // Return early if email is not provided
  }

  // Check if password is provided
  if (!password) {
    res
      .status(400)
      .json({ message: 'Password is required.', code: 'password_required' })
    return // Return early if password is not provided
  }

  try {
    // Sign in the user with the provided email and password
    const user = await signInWithEmailAndPassword(auth, email, password)

    // const userMetadata = db.collection('users').doc(user.user.uid).get()

    const userMetadataRef = collection(db, 'users')
    let q = query(userMetadataRef, where('email', '==', email))
    let querySnapshot = await getDocs(q)
    const userMetadata = querySnapshot.docs.map(doc => doc.data())

    // Respond with the signed-in user and a success code
    res.status(200).json({ user, code: 'success', userMetadata })
  } catch (error: unknown) {
    // Handle too many requests error
    if ((error as any)?.code === 'auth/too-many-requests') {
      res.status(429).json({
        user: null,
        message: 'Too many requests.',
        code: 'too_many_requests',
      })
      return // Return early if too many requests error occurs
    }

    // Handle wrong password error
    if ((error as any)?.code === 'auth/wrong-password') {
      res.status(400).json({
        user: null,
        message: 'Wrong password.',
        code: 'wrong_password',
      })
      return // Return early if wrong password error occurs
    }

    // Handle user not found error
    if ((error as any)?.code === 'auth/user-not-found') {
      res.status(400).json({
        user: null,
        message: 'User not found.',
        code: 'user_not_found',
      })
      return // Return early if user not found error occurs
    }

    // Log the error to the console for debugging
    // eslint-disable-next-line no-console
    console.error('Error setting password:', error)

    // Respond with an internal server error
    res.status(500).json({
      user: null,
      message: 'Internal server error.',
      code: 'internal_server_error',
    })
  }
}

// Export the handler as the default export
export default handler
