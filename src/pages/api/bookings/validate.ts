import { type NextApiRequest } from 'next'

import { propertyTypes } from '@lib/util/property-types'

export const validateBooking = (req: NextApiRequest) => {
  const { body = null } = req

  if (!body) {
    return {
      error: 'Missing body in request', // Respond with error if body is missing
      status: 400,
    }
  }

  const {
    email = null,
    startTimestamp = null,
    endTimestamp = null,
    phoneNumber = null,
    firstName = null,
    lastName = null,
    notes = null,
  } = body

  if (!email || typeof email !== 'string') {
    return {
      error: 'email must be a string', // Respond with error if email is not a string
      status: 400,
    }
  }

  if (
    !firstName ||
    !lastName ||
    typeof firstName !== 'string' ||
    typeof lastName !== 'string'
  ) {
    return {
      error: 'firstName and lastName must be a string', // Respond with error if firstName or lastName is missing
      status: 400,
    }
  }

  if (
    !startTimestamp ||
    !endTimestamp ||
    typeof startTimestamp !== 'string' ||
    typeof endTimestamp !== 'string' ||
    startTimestamp.length !== 19 ||
    endTimestamp.length !== 19
  ) {
    return {
      error:
        'startTimestamp and endTimestamp must be a string of length 19 in the format YYYY-MM-DD HH:MM:SS', // Respond with error if startTimestamp or endTimestamp is missing
      status: 400,
    }
  }

  // if timestamp string is not a valid date
  if (
    isNaN(new Date(startTimestamp).getTime()) ||
    isNaN(new Date(endTimestamp).getTime())
  ) {
    return {
      error:
        'startTimestamp and endTimestamp must be formatted as YYYY-MM-DD HH:MM:SS', // Respond with error if startTimestamp or endTimestamp is not a valid date
      status: 400,
    }
  }

  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return {
      error: 'phoneNumber must be a string', // Respond with error if phoneNumber is not a string
      status: 400,
    }
  }

  if (notes && typeof notes !== 'string') {
    return {
      error: 'notes must be a string', // Respond with error if notes is not a string
      status: 400,
    }
  }

  const startTimestampEpoch = new Date(startTimestamp).getTime()
  const endTimestampEpoch = new Date(endTimestamp).getTime()
  const currentTimestampEpoch = new Date().getTime()

  if (startTimestampEpoch >= endTimestampEpoch) {
    return {
      error: 'startTimestamp must be before endTimestamp', // Respond with error if startTimestamp is after endTimestamp
      status: 400,
    }
  }

  if (startTimestampEpoch <= currentTimestampEpoch) {
    return {
      error: 'startTimestamp must be in the future', // Respond with error if startTimestamp is in the past
      status: 400,
    }
  }

  return {
    error: null,
    status: 200,
  }
}

export const validateProperty = (req: NextApiRequest) => {
  const { body = null } = req

  if (!body) {
    return {
      error: 'Missing body in request', // Respond with error if body is missing
      status: 400,
    }
  }

  const { property = null } = body

  if (!property || typeof property !== 'string') {
    return {
      error: 'property must be a string', // Respond with error if property is not a string
      status: 400,
    }
  }

  if (!propertyTypes.includes(property)) {
    return {
      error: 'Invalid property type', // Respond with error if property is not a valid property type
      status: 400,
    }
  }

  return {
    error: null,
    status: 200,
  }
}
