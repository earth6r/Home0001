// Import necessary modules
import { enableCors } from '@lib/next/cors'
import { setCorsHeaders } from '@lib/util/cors'
import { saveError } from '@lib/util/save-error'
import axios from 'axios'

import { type NextApiRequest, type NextApiResponse } from 'next' // Type definitions for Next.js API routes

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route to respond to a request (5 minutes)
}

// Handler function to process API requests
// curl -X GET https://hometrics0001.vercel.app/api/users/get-current-step?email=test@test.org
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  setCorsHeaders(req, res)

  const { email } = req.query

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    // Your server-side request (not affected by browser CORS)
    const response = await axios.get(
      `https://hometrics0001.vercel.app/api/users/get-current-step?email=${email}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )

    // Return the response from your API
    return res.status(200).json(response.data)
  } catch (error: any) {
    console.error('Error fetching user current step:', error.message)
    saveError(error, 'proxyGetUserCurrentStep')

    // Forward the status code and error
    return res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Error fetching user current step',
    })
  }
}

// Export the handler as the default export
export default enableCors(handler)
