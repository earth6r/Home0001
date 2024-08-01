import axios from 'axios'

export const updateHubspotContact = async (email: string, date: Date) => {
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

  const response = await axios.patch(
    `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`,
    {
      properties: {
        upcoming_meeting_scheduled: formattedStringDateTime,
        upcoming_meeting_scheduled_date: formattedStringDate,
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
}
