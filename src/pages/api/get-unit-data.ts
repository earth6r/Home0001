import { type NextApiRequest, type NextApiResponse } from 'next' // Type definitions for Next.js API routes

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route to respond to a request (5 minutes)
}

// Handler function to process API requests
// curl -X GET http://localhost:3000/api/get-buying-progress?email=apinanapinan@icloud.com
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query // Extract query parameters from the request

  const email = query?.email // Extract the 'email' query parameter
}

export default handler
