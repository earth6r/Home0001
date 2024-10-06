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
): Promise<void> {
  const { singleSendId } = req.query

  try {
    // Make a request to retrieve the specific Marketing Single Send
    const [response, body] = await sendgridClient.request({
      method: 'GET',
      url: `/v3/marketing/singlesends/${singleSendId}`,
    })

    return res.status(200).json({
      singleSend: body,
    })
  } catch (error) {
    console.error('Error fetching single send details:', error)
    return res
      .status(500)
      .json({ message: "Couldn't retrieve single send details", error })
  }
}
