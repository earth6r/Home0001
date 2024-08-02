/* eslint-disable no-console */
import { enableCors } from '@lib/next/cors'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'
import { JWT } from 'google-auth-library'
import moment from 'moment-timezone'

const SCOPES = ['https://www.googleapis.com/auth/calendar.events']
const Subject = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_IMPERSONATE

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
    orderBy: 'startTime'
  })
  const events = response.data.items || []
  return events.some(event => event.start?.date)
}

async function getAvailableSlotsForDay(
  auth: any,
  date: Date
): Promise<{ start: string }[]> {
   
  const calendar = google.calendar({ version: 'v3', auth })

  const dayOfWeek = new Date(date).getDay()
  if (dayOfWeek < 1 || dayOfWeek > 5) {
    return []
  }

  
  let reservestartdate_specifictime= moment.tz(date, "America/New_York").set({ hour: 0, minute: 0 });
  const reservestartDateTime =moment(reservestartdate_specifictime).format();
  const reserveendDateTime =  moment.tz(reservestartDateTime, "America/New_York").add(23, "h").format();

  const isReserved = await getAllDayEvents(
    auth,
    reservestartDateTime,
    reserveendDateTime
  )
  if (isReserved) {
    return []
  }
 
  let startdate_specifictime= moment.tz(date, "America/New_York").set({ hour: 10, minute: 0 });
  const startDateTime =moment(startdate_specifictime).format();
  const endDateTime =  moment.tz(startDateTime, "America/New_York").add(5, "h").format();

  const response = await calendar.events.list({
    calendarId: Subject,
    timeMin: startDateTime,
    timeMax: endDateTime,
    singleEvents: true,
    orderBy: 'startTime'
  })

  const events = response.data.items || []

  const availableSlots: { start: string }[] = []

  const slotDuration = 2 * 60 * 60 * 1000
  const slotOverlap = 1 * 60 * 60 * 1000

  if (events.length === 0) {
    for (
      let start = new Date(startDateTime);
      start <= new Date(endDateTime);
      start = new Date(start.getTime() + slotOverlap)
    ) {
      availableSlots.push({ start: moment.tz(start,"America/New_York").format('HH:mm') });
    }
  } else {
    for (
      let start = new Date(startDateTime);
      start <= new Date(endDateTime);
      start = new Date(start.getTime() + slotOverlap)
    ) {
      const end = new Date(start.getTime() + slotDuration);

      const isFree = events.every(event => {
        const eventStart = new Date(event.start!.dateTime!)
        const eventEnd = new Date(event.end!.dateTime!)
        const formatTime = (date:any) => date.toISOString().slice(0, 16);
        return formatTime(end) <= formatTime(eventStart) || formatTime(start) >= formatTime(eventEnd) 
      })
      
      if (isFree) {
        availableSlots.push({ start:  moment.tz(start,"America/New_York").format('HH:mm') });
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

  const auth = new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: SCOPES,
    subject: Subject,
  })

  try {
    const datePromises = Array.from({ length: 90 }, (_, i) => {
      const currentDate = new Date();

      currentDate.setDate(new Date().getDate() + i)
      if (i < 2) {
        return Promise.resolve({
          date: currentDate.toISOString().split('T')[0],
          slots: [],
          HasAvailability: false,
        })
      }
    
      return getAvailableSlotsForDay(auth, currentDate).then(slots => ({
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