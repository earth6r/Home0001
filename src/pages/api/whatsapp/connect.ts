import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const appAccessToken = `${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}|${process.env.FACEBOOK_DEPLOYMENT_OAUTH_CLIENT_SECRET}`
const client_id = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID
const client_secret = process.env.FACEBOOK_DEPLOYMENT_OAUTH_CLIENT_SECRET

const WEBHOOK_VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN
const WEBHOOK_URL = process.env.WHATSAPP_WEBHOOK_URL

export const config = {
  maxDuration: 300,
}

const exchangeToken = async (code: string) => {
  // Make the token exchange request
  const response = await axios.post(
    'https://graph.facebook.com/v18.0/oauth/access_token',
    {
      client_id,
      client_secret,
      code,
    }
  )

  return response
}

const assignUser = async (
  whatsapp_business_account_id: string,
  whatsappUserId: string,
  accessToken: string
) => {
  return axios.post(
    `https://graph.facebook.com/v18.0/${whatsapp_business_account_id}/assigned_users?access_token=${accessToken}`,
    {
      tasks: ['MANAGE'],
      user: whatsappUserId,
    }
  )
}

const registerPhoneNumber = async (
  phoneNumberId: string,
  accessToken: string
) => {
  return axios.post(
    `https://graph.facebook.com/v18.0/${phoneNumberId}/register`,
    {
      messaging_product: 'whatsapp',
      pin: '123456', // This is a required field, but the value doesn't matter
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
}

const subscribeApp = async (
  whatsapp_business_account_id: string,
  accessToken: string
) => {
  await axios.post(
    `https://graph.facebook.com/v18.0/${whatsapp_business_account_id}/subscribed_apps?access_token=${accessToken}&subscribed_fields=messages`
  )
  await axios.post(
    `https://graph.facebook.com/v19.0/${client_id}/subscriptions`,
    {
      access_token: appAccessToken,
      object: 'whatsapp_business_account',
      callback_url: `${WEBHOOK_URL}/api/chat/async/whatsapp_webhook`,
      fields: 'messages',
      verify_token: WEBHOOK_VERIFY_TOKEN,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  await axios.post(
    `https://graph.facebook.com/v19.0/${whatsapp_business_account_id}/subscribed_apps`,
    {
      callback_url: `${WEBHOOK_URL}/api/chat/async/whatsapp_webhook`,
      verify_token: WEBHOOK_VERIFY_TOKEN,
      subscribed_fields: ['messages'],
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
}

const getPhoneNumbers = async (
  whatsapp_business_account_id: string,
  accessToken: string
) => {
  return axios.get(
    `https://graph.facebook.com/v18.0/${whatsapp_business_account_id}/phone_numbers`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
}

const getPhoneNumberIds = async (response: any) => {
  return response.data.data.map((phoneNumber: any) => phoneNumber.id)
}

const getWhatsAppBusinessDetails = async (accessToken: string) => {
  return axios.get(`https://graph.facebook.com/v18.0/debug_token`, {
    params: {
      input_token: accessToken,
      access_token: appAccessToken,
    },
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { code } = req.body

    let accessToken: string | null = null
    let whatsapp_business_account_id = null
    let whatsappUserId = null

    let response = await exchangeToken(code)
    accessToken = response.data.access_token as string

    response = await getWhatsAppBusinessDetails(accessToken)
    whatsapp_business_account_id =
      response.data.data.granular_scopes[0].target_ids[0]
    whatsappUserId = response.data.data.user_id

    response = await assignUser(
      whatsapp_business_account_id,
      whatsappUserId,
      accessToken
    )

    response = await getPhoneNumbers(whatsapp_business_account_id, accessToken)

    const phoneNumberIds = await getPhoneNumberIds(response)

    for (const phoneNumberId of phoneNumberIds) {
      try {
        await registerPhoneNumber(phoneNumberId, accessToken)
      } catch (error: any) {
        console.error('Error registering phone number', error.response.data)
      }
    }

    await subscribeApp(whatsapp_business_account_id, accessToken)

    response = await axios.get(
      `https://graph.facebook.com/v18.0/${whatsapp_business_account_id}/subscribed_apps`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    res.status(200).json({ accessToken })
  } catch (error: any) {
    console.error('Error', error, error.response.data)
    return res.status(400).json({ error: JSON.stringify(error) })
  }
}
