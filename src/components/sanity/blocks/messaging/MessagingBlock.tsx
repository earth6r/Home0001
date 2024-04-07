import React, { useState } from 'react'

export const MessagingBlock: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [method, setMethod] = useState<string>('sms')
  const [confirmed, setConfirmed] = useState<boolean>(false)

  async function sendMessage(messageData: {
    recipientPhone: string
    message: string
  }): Promise<string> {
    const response = await fetch('/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to submit comment')
    }

    const responseData = await response.json()
    console.log('responseData:', responseData)
    setConfirmed(true)
    return responseData.message
  }
  const handleSend = () => {
    if (method === 'sms') {
      sendSMS()
    } else {
      sendWhatsApp() // You need to implement this function
    }
  }

  const sendSMS = async () => {
    try {
      await sendMessage({
        recipientPhone: phoneNumber,
        message: message,
      })
      console.log('sent!')
    } catch (error) {
      console.error(error)
    }
  }

  const sendWhatsApp = () => {
    // WhatsApp API code here
    console.log('Sending message via WhatsApp')
  }

  return confirmed ? (
    <h1>Message Sent TO: {phoneNumber}</h1>
  ) : (
    <div>
      <label>Phone Number:</label>
      <input
        type="text"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
      />
      <br />
      <label>Message:</label>
      <textarea value={message} onChange={e => setMessage(e.target.value)} />
      <br />
      <label>
        Method:
        <select value={method} onChange={e => setMethod(e.target.value)}>
          <option value="sms">SMS</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </label>
      <br />
      <button onClick={handleSend}>Send</button>
    </div>
  )
}

export default MessagingBlock
