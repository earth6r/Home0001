/*
This will be the API route that will be called when the user submits the form. It will save the data to the Firestore database.
When an existing entry exists, it will update the altHome field. If the entry does not exist, it will create a new entry.
*/

import { initializeAdmin } from '@lib/firebase/admin'
import admin from 'firebase-admin'
import type { NextApiRequest, NextApiResponse } from 'next/types'

type Location =
  | 'LA'
  | 'Berlin'
  | 'CDMX'
  | 'NYC'
  | 'London'
  | 'Paris'
  | 'Somewhere else'
type CommunicationPreference = 'whatsapp' | 'sms' | 'telegram'
type BuyingTimeline = 'notsure' | '6to12mos' | '3to6mos' | '1to3mos' | 'now'
type BedroomPreference = '1bdrm' | '2bdrm' | 'Depends' | '3+bdrm'

type RegisterData = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  altHome: string
  communicationPreference: CommunicationPreference
  locationsOfInterest: Location[]
  buyingTimelinedec2023: BuyingTimeline
  bedroomPreference: BedroomPreference
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    altHome,
    communicationPreference,
    locationsOfInterest,
    buyingTimelinedec2023,
    bedroomPreference,
  } = req.body as RegisterData

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  const registerResponse = await db
    .collection('registers')
    .where('email', '==', email)
    .get()

  // existing register
  if (!registerResponse.empty) {
    const register = registerResponse.docs[0]

    let existingBedroomPreference = register.get('bedroomPreference')
    if (!Array.isArray(existingBedroomPreference)) {
      existingBedroomPreference = []
    }

    await register.ref.update({
      altHome,
    })
  } else {
    await db.collection('registers').add({
      firstName,
      lastName,
      email,
      phoneNumber,
      altHome,
      communicationPreference,
      locationsOfInterest,
      buyingTimelinedec2023,
      bedroomPreference,
    })
  }
}
