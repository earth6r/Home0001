import { sendMessage } from '../send-whatsapp'

export const sendWhatsappBookedMessage = async (
  firstName: string,
  lastName: string,
  startTimestamp: string,
  email: string,
  phoneNumber: string
) => {
  const message = `A HOME0001 phone call was booked at ${startTimestamp} UTC. 
  
  Name: ${firstName} ${lastName}
  Email: ${email} 
  Phone: ${phoneNumber}.`

  const numbers = [
    '+15038676436',
    '+4915168698913',
    '+17134103755', // yan
    '+14377703354', // api
    '+19175824100',
    '+447577459373',
    '+491634841797',
  ]

  for (const number of numbers) {
    await sendMessage(number, message)
  }
}
