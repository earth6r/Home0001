/* eslint-disable no-console */
import { enableCors } from '@lib/next/cors'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'
import { JWT } from 'google-auth-library'
import moment from 'moment-timezone'

const SCOPES = ['https://www.googleapis.com/auth/calendar']
const Subject = 'talin@home0001.com' // test with talin@home0001.com as well

const keys = {
  client_email: process.env.GOOGLE_API_CLIENT_EMAIL,
  // @ts-ignore
  private_key: process.env.GOOGLE_API_PRIVATE_KEY.replace(/\\n/g, '\n'),
}

async function getAllDayEvents(
  auth: any,
  timeMin: string,
  timeMax: string
): Promise<boolean> {
  const calendar = google.calendar({ version: 'v3', auth })

  const response = await calendar.events.list({
    calendarId: Subject,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: 'startTime',
    timeZone: 'America/New_York',
  })

  const events = response.data.items || []

  return events.some(event => event.start?.date)
}

function formatTime(date: Date): string {
  return moment.tz(date, 'America/New_York').format('HH:mm')
}

async function getAvailableSlotsForDay(
  email: string,
  auth: any,
  date: Date,
  weekStart: number,
  weekEnd: number
): Promise<{ start: string }[]> {
  const calendar = google.calendar({ version: 'v3', auth })
  const dayOfWeek = date.getDay()
  const threeWeeksLimit = new Date().getTime() + 21 * 24 * 60 * 60 * 1000

  if (
    dayOfWeek < weekStart ||
    dayOfWeek > weekEnd ||
    date.getTime() > threeWeeksLimit
  ) {
    return []
  }

  const dayStart = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      0,
      0,
      0,
      0
    )
  )

  const dayEnd = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      23,
      59,
      59,
      999
    )
  )

  const isReserved = await getAllDayEvents(
    auth,
    dayStart.toISOString(),
    dayEnd.toISOString()
  )
  if (isReserved) {
    return []
  }

  const timeMin = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      11,
      0,
      0,
      0
    )
  )
  const timeMax = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      23,
      0,
      0,
      0
    )
  )

  const response = await calendar.events.list({
    calendarId: Subject,
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    timeZone: 'America/New_York',
  })

  const events = response.data.items || []
  const availableSlots: { start: string }[] = []

  const slotDuration = 15 * 60
  const slotOverlap = 60 * 60 * 1000

  if (events.length === 0) {
    for (
      let start = timeMin;
      start <= timeMax;
      start = new Date(start.getTime() + slotOverlap)
    ) {
      availableSlots.push({ start: formatTime(start) })
    }
  } else {
    for (
      let start = timeMin;
      start <= timeMax;
      start = new Date(start.getTime() + slotOverlap)
    ) {
      const end = new Date(start.getTime() + slotDuration)

      const isFree = events.every(event => {
        const eventStart = new Date(event.start!.dateTime!)
        const eventEnd = new Date(event.end!.dateTime!)
        return end <= eventStart || start >= eventEnd
      })

      if (isFree) {
        availableSlots.push({ start: formatTime(start) })
      }
    }
  }

  return availableSlots
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const {
    email,
    bookingNotice = '2', // how many days in advance someone can book
    weekStart = '1',
    weekEnd = '5',
  } = req.query as {
    email: string
    bookingNotice: string
    weekStart: string
    weekEnd: string
  }

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const utcnow = new Date()
  const now = new Date(utcnow.getTime() - utcnow.getTimezoneOffset() * 60000)

  const auth = new google.auth.JWT(
    keys.client_email,
    undefined,
    keys.private_key,
    SCOPES
  )

  try {
    const datePromises = Array.from({ length: 90 }, (_, i) => {
      const currentDate = new Date(now)
      currentDate.setDate(now.getDate() + i)

      if (i < Number(bookingNotice)) {
        return Promise.resolve({
          date: currentDate.toISOString().split('T')[0],
          slots: [],
          HasAvailability: false,
        })
      }
      return getAvailableSlotsForDay(
        email,
        auth,
        currentDate,
        Number(weekStart),
        Number(weekEnd)
      ).then(slots => ({
        date: currentDate.toISOString().split('T')[0],
        slots: slots.map(slot => slot.start),
        HasAvailability: slots.length > 0,
      }))
    })

    const allAvailableSlots = await Promise.all(datePromises)
    res.status(200).json({ data: allAvailableSlots })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default enableCors(handler)
