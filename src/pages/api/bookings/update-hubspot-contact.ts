import { saveError } from '@lib/util/save-error'
import axios from 'axios'

export const updateHubspotContact = async (
  email: string,
  date: Date,
  firstName?: string,
  lastName?: string
) => {
  const utcDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  )

  const utcDateTime = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  )

  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'America/New_York',
    timeZoneName: 'short',
  }

  // only date, no time
  const options1 = {
    timeZone: 'America/New_York',
  }

  // @ts-expect-error TODO: fix this
  const estDateTime = utcDateTime.toLocaleString('en-US', options)
  const estDateOnly = new Date(utcDate.toLocaleString('en-US', options1))

  const dateParts = estDateTime.split(', ')

  const formattedStringDateTime = `${dateParts[0]}, ${dateParts[1]}`
  const formattedStringDate = estDateOnly.toISOString()

  try {
    const response = await axios.patch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`,
      {
        properties: {
          upcoming_meeting_scheduled: formattedStringDateTime,
          // upcoming_meeting_scheduled_date: formattedStringDate, // NOTE: do not need this right now
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUBSPOT_API_KEY}`,
        },
      }
    )

    return response.data
  } catch (error: any) {
    if (error?.response?.data?.message === 'resource not found') {
      try {
        // create the contact
        await axios.post(
          'https://api.hubapi.com/crm/v3/objects/contacts',
          {
            properties: {
              email,
              upcoming_meeting_scheduled: formattedStringDateTime,
              firstname: firstName,
              lastname: lastName,
              // upcoming_meeting_scheduled_date: formattedStringDate, // NOTE: do not need this right now
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
        console.error('Error creating Hubspot contact', error.response.data)
        saveError(
          {
            error,
            additionalInfo: {
              email,
              date,
              details: 'Error creating Hubspot contact',
            },
          },
          'updateHubspotContact'
        )
      }
    } else {
      console.error('Error updating Hubspot contact', error)
      saveError(
        {
          error,
          additionalInfo: {
            email,
            date,
          },
        },
        'updateHubspotContact'
      )

      throw error
    }
  }
}
