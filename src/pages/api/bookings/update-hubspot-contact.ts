import axios from 'axios'

export const updateHubspotContact = async (email: string, date: Date) => {
  const utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
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

  const formattedDate = utcDate.toLocaleString('en-US', options)

  const dateParts = formattedDate.split(', ')

  const formattedString = `${dateParts[0]}, ${dateParts[1]}`

  const response = await axios.patch(
    `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`,
    {
      properties: {
        upcoming_meeting_scheduled: formattedString,
        upcoming_meeting_scheduled_date: utcDate.toISOString(),
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
