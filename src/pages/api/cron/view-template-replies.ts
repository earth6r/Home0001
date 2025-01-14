import { initializeAdmin } from '@lib/firebase/admin'
import { NextApiRequest, NextApiResponse } from 'next/types'
import admin from 'firebase-admin'

const queryTextMessagesHistory = async (db: FirebaseFirestore.Firestore) => {
  const textMessagesHistory = db
    .collection('textMessagesHistory')
    .where('template', '==', 'automated_follow_up_messages')
    .where('replied', '==', false)
    .get()

  return (await textMessagesHistory).docs.map(doc => doc.data())
}

export const queryRocketChatWebhookEvents = async (
  db: FirebaseFirestore.Firestore
) => {
  const rocketChatWebhookEvents = db
    .collection('rocketChatWebhookEvents')
    .where('type', '==', 'message')
    .get()

  return (await rocketChatWebhookEvents).docs.map(doc => doc.data())
}

export const setupFirebase = () => {
  initializeAdmin()
  return admin.firestore()
}

const userReplied = (event: any, recipientPhone: string) => {
  const { visitor, messages } = event
  const visitorPhoneNumber = visitor?.phone[0]?.phoneNumber

  if (visitorPhoneNumber !== recipientPhone) {
    return false
  }

  const visitorId = visitor?._id

  if (!visitorId) {
    return false
  }

  const visitorMessages = messages.filter(
    (message: { u: { _id: any } }) => message.u._id === visitorId
  )

  return visitorMessages.length > 0
}

export const userRepliedInRocketChat = async (
  db: FirebaseFirestore.Firestore,
  recipientPhone: string
) => {
  const rocketChatWebhookEvents = await queryRocketChatWebhookEvents(db)

  return rocketChatWebhookEvents.some(event =>
    userReplied(event, recipientPhone)
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const db = setupFirebase()

  const textMessagesHistory = await queryTextMessagesHistory(db)

  textMessagesHistory.forEach(async message => {
    const { recipientPhone } = message

    const replied = await userRepliedInRocketChat(db, recipientPhone)

    if (!replied) {
      return
    }

    await db.collection('textMessagesHistory').doc(message.id).update({
      replied: true,
    })
  })

  res.status(200).json(textMessagesHistory)
}
