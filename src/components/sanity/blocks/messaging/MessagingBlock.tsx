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

  const validatePhoneNumber = (input: string) => {
    // Regular expression to validate phone number format with country code and area code
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/
    return phoneRegex.test(input)
  }

  const isPhoneNumberValid = validatePhoneNumber(phoneNumber)

  return confirmed ? (
    <div
      className="max-w-md mx-auto mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Success!</strong>
      <span className="block sm:inline"> Message Sent TO: {phoneNumber}</span>
      <span className="absolute top-0 right-0 mt-1 mr-2">
        <svg
          onClick={() => setConfirmed(false)}
          className="fill-current h-4 w-4 text-green-500 cursor-pointer"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a.5.5 0 0 1 0 .707l-.707.707a.5.5 0 0 1-.707 0L10 11.707l-2.935 2.85a.5.5 0 0 1-.707 0l-.707-.707a.5.5 0 0 1 0-.707l2.85-2.935-2.85-2.935a.5.5 0 0 1 0-.707l.707-.707a.5.5 0 0 1 .707 0L10 8.293l2.935-2.85a.5.5 0 0 1 .707 0l.707.707a.5.5 0 0 1 0 .707l-2.85 2.935 2.85 2.935z" />
        </svg>
      </span>
    </div>
  ) : (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phoneNumber"
        >
          Phone Number:
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            isPhoneNumberValid ? 'border-green-500' : 'border-red-500'
          }`}
          id="phoneNumber"
          type="text"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
        />
        {!isPhoneNumberValid && (
          <p className="text-red-500 text-xs italic">
            Please enter a valid phone number with country code and area code.
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="message"
        >
          Message:
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="method"
        >
          Method:
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="method"
          value={method}
          onChange={e => setMethod(e.target.value)}
        >
          <option value="sms">SMS</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </div>
      <div className="text-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default MessagingBlock
