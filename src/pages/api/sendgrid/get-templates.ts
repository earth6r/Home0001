import { NextApiRequest, NextApiResponse } from 'next/types'
import sendgridClient from '@sendgrid/client'

const apiKey = process.env.SENDGRID_API_KEY
if (!apiKey) {
  throw new Error('SENDGRID_API_KEY is not defined')
}
sendgridClient.setApiKey(apiKey)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Make a request to retrieve all Marketing Single Sends
    const [response, body] = await sendgridClient.request({
      method: 'GET',
      url: '/v3/marketing/singlesends',
    })

    // Return the list of single sends
    return res.status(200).json({ singleSends: body })
  } catch (error) {
    console.error('Error fetching single sends:', error)
    return res
      .status(500)
      .json({ message: "Couldn't retrieve single sends", error })
  }
}
