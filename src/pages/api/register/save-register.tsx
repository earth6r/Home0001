/*
This will be the API route that will be called when the user submits the form. It will save the data to the Firestore database.
When an existing entry exists, it will update the altHome field. If the entry does not exist, it will create a new entry.
*/

import { initializeAdmin } from '@lib/firebase/admin'
import axios from 'axios'
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
  altHome: boolean
  communicationPreference: CommunicationPreference
  locationsOfInterest: Location[]
  buyingTimelinedec2023: BuyingTimeline
  bedroomPreference: BedroomPreference
  userAgent: string | undefined
}

// TODO: delete this after frontend has deleted this
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'success' })
}

export default handler
