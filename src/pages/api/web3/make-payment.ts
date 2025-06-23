import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { saveError } from '@lib/util/save-error'
import { setCorsHeaders } from '@lib/util/cors'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  setCorsHeaders(req, res)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const userData = req.body

  if (!userData || !userData.email || !userData.signupSource) {
    return res.status(400).json({ error: 'Valid user data is required' })
  }

  try {
    const response = await axios.post(
      'https://hometrics0001.vercel.app/api/users/make-payment',
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )

    return res.status(200).json(response.data)
  } catch (error: any) {
    console.error('Error making payment:', error.message)
    saveError(error, 'proxyCreateUserProfile')

    return res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Error making payment',
    })
  }
}
