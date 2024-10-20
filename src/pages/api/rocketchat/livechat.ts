import axios from 'axios'

// Function to generate a 17-character random token
function generateToken() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 17; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return token
}

// NOTE: do not use this for whatsapp
export const createVisitorAndChatRoom = async (
  name: string,
  email: string,
  phone: string,
  message: string
) => {
  try {
    // Step 1: Generate a 17-character token
    let visitorToken = generateToken()

    const { ROCKETCHAT_PAT, ROCKETCHAT_USER_ID } = process.env

    // Step 2: Register the visitor with the generated token
    const registerVisitorResponse = await axios.post(
      'https://home0001.rocket.chat/api/v1/livechat/visitor',
      {
        visitor: {
          token: visitorToken,
          name,
          email,
          phone,
        },
      },
      {
        headers: {
          'X-Auth-Token': ROCKETCHAT_PAT,
          'X-User-Id': ROCKETCHAT_USER_ID,
          'Content-Type': 'application/json',
        },
      }
    )

    visitorToken = registerVisitorResponse.data.visitor.token

    // Step 3: Create a live chat room for the visitor using the token
    const createRoomResponse = await axios.get(
      `https://home0001.rocket.chat/api/v1/livechat/room?token=${visitorToken}`,
      {
        headers: {
          'X-Auth-Token': ROCKETCHAT_PAT,
          'X-User-Id': ROCKETCHAT_USER_ID,
          'Content-Type': 'application/json',
        },
      }
    )

    await axios.post(
      `https://home0001.rocket.chat/api/v1/livechat/message`,
      {
        token: visitorToken,
        rid: createRoomResponse.data.room._id,
        msg: message,
      },
      {
        headers: {
          'X-Auth-Token': ROCKETCHAT_PAT,
          'X-User-Id': ROCKETCHAT_USER_ID,
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error: any) {
    console.error(
      'Error creating visitor or live chat room:',
      error.response?.data || error.message
    )
  }
}
