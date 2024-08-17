import { NextApiRequest, NextApiResponse } from 'next/types'
import { updateHubspotContactProperties } from '@lib/util/update-hubspot-contact'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { email } = req.query as { email: string }
  const { properties } = req.body

  await updateHubspotContactProperties(email, properties)

  res.status(200).json({
    status: 'success',
  })
}
