import { NextApiRequest, NextApiResponse } from 'next/types'
import axios from 'axios'
import { saveError } from '@lib/util/save-error'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { email } = req.query as { email: string }
  const { note } = req.body

  const response = await axios.get(
    `https://api.hubapi.com/crm/v3/objects/contacts`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUBSPOT_API_KEY}`,
      },
    }
  )

  const contact = response.data.results.find(
    (contact: any) => contact.properties.email === email
  )

  if (!contact) {
    res.status(404).json({
      status: 'error',
      message: 'Contact not found',
    })

    return
  }

  const hubspotContactId = contact.id

  try {
    await axios.patch(
      `https://api.hubapi.com/engagements/v1/engagements`,
      {
        engagement: {
          active: true,
          type: 'NOTE',
          timestamp: new Date().getTime(),
        },
        associations: {
          contactIds: [hubspotContactId],
          companyIds: [],
          dealIds: [],
          ownerIds: [],
        },
        metadata: {
          body: ``,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUBSPOT_API_KEY}`,
        },
      }
    )
  } catch (error: any) {
    console.error('Error updating Hubspot contact properties', error)
    saveError(
      {
        error,
        additionalInfo: {
          email,
          note,
        },
      },
      'updateHubspotContactProperties'
    )

    throw error
  }

  res.status(200).json({
    status: 'success',
  })
}
