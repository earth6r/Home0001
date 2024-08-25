import { google } from 'googleapis'
import { JWT } from 'google-auth-library'
import moment from 'moment-timezone'

const keys = {
  client_email: process.env.GOOGLE_API_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_API_PRIVATE_KEY,
}

async function createCalendarEvent({
  startTime,
  endTime,
  eventName,
  inviteeEmail,
  eventDescription,
  calendarEmail,
  zoom = true,
}: {
  startTime: string
  endTime: string
  eventName: string
  inviteeEmail: string
  eventDescription: string
  calendarEmail: string
  zoom?: boolean
}) {
  const Subject = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_IMPERSONATE

  const auth = new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
    subject: calendarEmail,
  })

  const calendar = google.calendar({ version: 'v3', auth })

  const staffEmails = [
    inviteeEmail,
    // 'dzelefsky@braverlaw.net',
    // 'scott@choicefamily.com',
    // 'Matthew@omnititle.com',
    // 'gio@choicefamily.com',
    // 'andres@hoggholdings.com',
    // 'annika@home0001.com',
    // 'm@choicefamily.com',
    // 'yan@home0001.com',
    calendarEmail,
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

  let fullEventDescription = `${eventDescription}`
  if (zoom) {
    fullEventDescription += `\n\nJoin Zoom Meeting:\n${zoomLink}`
  }

  const startDateTime = moment.utc(startTime).toDate()
  const endDateTime = moment.utc(endTime).toDate()

  const event = {
    summary: eventName,
    location: zoom ? zoomLink : '48 Allen Street, New York, NY 10002',
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
      // { email: Subject },
      { email: inviteeEmail },
      ...staffEmails.map(email => ({ email })),
    ],
  }

  const response = await calendar.events.insert({
    calendarId: Subject,
    requestBody: event,
    sendUpdates: 'all',
  })

  return response.data.id // event id
}

async function deleteCalendarEvent({
  calendarEmail,
  eventId,
}: {
  calendarEmail: string
  eventId: string
}) {
  const Subject = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_IMPERSONATE

  const auth = new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
    subject: calendarEmail,
  })

  const calendar = google.calendar({ version: 'v3', auth })

  const response = await calendar.events.delete({
    calendarId: Subject,
    eventId,
  })

  return response.data
}

async function updateCalendarEvent({
  startTime,
  endTime,
  eventId,
  calendarEmail,
  eventName,
  inviteeEmail,
  eventDescription,
}: {
  startTime: string
  endTime: string
  eventId: string
  calendarEmail: string
  eventName: string
  inviteeEmail: string
  eventDescription: string
}) {
  const Subject = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_IMPERSONATE

  const auth = new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
    subject: calendarEmail,
  })

  const calendar = google.calendar({ version: 'v3', auth })

  const startDateTime = moment.utc(startTime).toDate()
  const endDateTime = moment.utc(endTime).toDate()

  const staffEmails = [
    inviteeEmail,
    // 'dzelefsky@braverlaw.net',
    // 'scott@choicefamily.com',
    // 'Matthew@omnititle.com',
    // 'gio@choicefamily.com',
    // 'andres@hoggholdings.com',
    // 'annika@home0001.com',
    // 'm@choicefamily.com',
    // 'yan@home0001.com',
    calendarEmail,
  ]

  const event = {
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'UTC',
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'UTC',
    },
    summary: eventName,
    description: eventDescription,
    attendees: [
      { email: inviteeEmail },
      ...staffEmails.map(email => ({ email })),
    ],
  }

  const response = await calendar.events.update({
    calendarId: Subject,
    eventId,
    requestBody: event,
  })

  return response.data.id // event id
}

export { createCalendarEvent, deleteCalendarEvent, updateCalendarEvent }
