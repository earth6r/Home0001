import moment from 'moment-timezone'
import {
  sendMessage,
  sendWAMessagePropertyTourBooked,
  sendWAMessageReschedulePhoneCall,
  sendWAMessageReschedulePropertyTour,
} from '../../pages/api/send-whatsapp'

export const sendWhatsappBookedMessage = async (
  firstName: string,
  lastName: string,
  startTimestamp: string,
  email?: string,
  phoneNumber?: string,
  rescheduled?: boolean,
  isPropertyTour?: boolean
) => {
  // convert startTimestamp from UTC to EST
  // start timestamp format YYYY-MM-DD HH:MM:SS
  // TODO: use similar logic to create booking conversion from est to utc
  const [datePart, timePart] = startTimestamp.split(' ')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hours, minutes, seconds] = timePart.split(':').map(Number)
  const startTimestampUTC = new Date(
    Date.UTC(year, month - 1, day, hours, minutes, seconds)
  )
  moment.tz.setDefault('America/New_York')
  const startTimestampEST = moment(startTimestampUTC)
    .tz('America/New_York')
    .format('YYYY-MM-DD HH:mm:ss')

  const wording =
    typeof rescheduled === 'boolean' && rescheduled ? 'rescheduled' : 'booked'
  const bookingTypeWording = isPropertyTour ? 'property tour' : 'phone call'
  const message = `A HOME0001 ${bookingTypeWording} was ${wording} at ${startTimestampEST} EST. Name: ${firstName} ${lastName} Email: ${email} Phone: ${phoneNumber}.`

  const numbers = [
    '+15038676436',
    '+4915168698913',
    '+17134103755', // yan
    '+14377703354', // api
    '+19175824100',
    '+447577459373',
    '+491634841797',
    '+17868633711',
  ]

  for (const number of numbers) {
    if (rescheduled) {
      if (isPropertyTour) {
        await sendWAMessageReschedulePropertyTour(number, message)
      } else {
        await sendWAMessageReschedulePhoneCall(number, message)
      }
    } else {
      if (isPropertyTour) {
        await sendWAMessagePropertyTourBooked(number, message)
      } else {
        await sendMessage(number, message)
      }
    }
  }
}
