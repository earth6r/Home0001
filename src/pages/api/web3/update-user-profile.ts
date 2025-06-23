// Import necessary modules
import { enableCors } from '@lib/next/cors'
import { saveError } from '@lib/util/save-error'
import axios from 'axios'

import { type NextApiRequest, type NextApiResponse } from 'next' // Type definitions for Next.js API routes

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route to respond to a request (5 minutes)
}

// Handler function to process API requests
// curl -X PUT https://hometrics0001.vercel.app/api/users/update-profile
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, phoneNumber, id } = req.body

  if (!id) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    // Your server-side request (not affected by browser CORS)
    const response = await axios.put(
      `https://hometrics0001.vercel.app/api/users/update-profile?userId=${id}`,
      {
        firstName: firstName,
        lastName: lastName,
        email,
        phoneNumber: phoneNumber,
      },
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
    console.error('Error updating user profile:', error.message)
    saveError(error, 'proxyUpdateUserProfile')

    // Forward the status code and error
    return res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Error updating user profile',
    })
  }
}

// Export the handler as the default export
export default enableCors(handler)
