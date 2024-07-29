import { google } from 'googleapis'
import { JWT } from 'google-auth-library'
import moment from 'moment-timezone'

const keys = {
  client_email: process.env.GOOGLE_API_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_API_PRIVATE_KEY,
}

const Subject = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_IMPERSONATE

const auth = new JWT({
  email: keys.client_email,
  key: keys.private_key,
  scopes: ['https://www.googleapis.com/auth/calendar.events'],
  subject: Subject,
})

const calendar = google.calendar({ version: 'v3', auth })

async function createCalendarEvent({
  startTime,
  endTime,
  eventName,
  inviteeEmail,
  eventDescription,
}: {
  startTime: string
  endTime: string
  eventName: string
  inviteeEmail: string
  eventDescription: string
}) {
  const staffEmails = [
    inviteeEmail,
    // 'dzelefsky@braverlaw.net',
    // 'scott@choicefamily.com',
    // 'Matthew@omnititle.com',
    // 'gio@choicefamily.com',
    // 'andres@hoggholdings.com',
    // 'annika@home0001.com',
    // 'yan@home0001.com',
    // 'm@choicefamily.com',
    'collective@home0001.com',
  ]
  if (
    !startTime ||
    !endTime ||
    !eventName ||
    !Array.isArray(staffEmails) ||
    !inviteeEmail ||
    !eventDescription
  ) {
    throw new Error('Missing required fields or staffEmails is not an array.')
  }

  const zoomLink =
    'https://zoom.us/j/9199989063?pwd=RzhRMklXNWdJNGVKZjRkRTdkUmZOZz09'

  const fullEventDescription = `${eventDescription}\n\nJoin Zoom Meeting:\n${zoomLink}`

  const startDateTime = moment.utc(startTime).toDate()
  const endDateTime = moment.utc(endTime).toDate()

  const event = {
    summary: eventName,
    location: zoomLink,
    description: fullEventDescription,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'UTC',
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'UTC',
    },
    attendees: [
      { email: Subject },
      { email: inviteeEmail },
      ...staffEmails.map(email => ({ email })),
    ],
  }

  const response = await calendar.events.insert({
    calendarId: Subject,
    requestBody: event,
    sendUpdates: 'all',
  })

  return response.data.id
}

export default createCalendarEvent
