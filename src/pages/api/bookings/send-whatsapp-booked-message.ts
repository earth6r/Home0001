import { sendMessage } from '../send-whatsapp'

export const sendWhatsappBookedMessage = async (
  firstName: string,
  lastName: string,
  startTimestamp: string
) => {
  const message = `A HOME0001 phone call has been booked by ${firstName} ${lastName} on ${startTimestamp}.`

  const numbers = [
    '+15038676436',
    '+4915168698913',
    '+17134103755',
    '+19175824100',
    '+447577459373',
    '+491634841797',
  ]

  for (const number of numbers) {
    await sendMessage(number, message)
  }
}
