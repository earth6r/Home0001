import { saveError } from '@lib/util/save-error'
import axios from 'axios'

export const updateHubspotContact = async (
  email: string,
  date: Date,
  firstName?: string,
  lastName?: string,
  overrideProperty?: string
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

  try {
    const response = await axios.patch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`,
      {
        properties: {
          ...(overrideProperty
            ? {
                [overrideProperty]: formattedStringDateTime,
              }
            : {
                upcoming_meeting_scheduled: formattedStringDateTime,
              }),
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

export const updateHubspotContactProperty = async (
  email: string,
  propertyName: string,
  propertyValue: any
) => {
  try {
    const response = await axios.patch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`,
      {
        properties: {
          [propertyName]: propertyValue,
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
    console.error('Error updating Hubspot contact property', error)
    saveError(
      {
        error,
        additionalInfo: {
          email,
          propertyName,
          propertyValue,
        },
      },
      'updateHubspotContactProperty'
    )

    throw error
  }
}

export const updateHubspotContactProperties = async (
  email: string,
  properties: Record<string, any>
) => {
  try {
    const response = await axios.patch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`,
      {
        properties,
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
    console.error('Error updating Hubspot contact properties', error)
    saveError(
      {
        error,
        additionalInfo: {
          email,
          properties,
        },
      },
      'updateHubspotContactProperties'
    )

    throw error
  }
}
