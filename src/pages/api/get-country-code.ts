import type { NextApiRequest, NextApiResponse } from 'next'

export const fetchCountryCode = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/country/')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const countryCode = await response.text()
    return countryCode
  } catch (error) {
    console.error('Error fetching country code:', error)
    return 'US'
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await fetchCountryCode()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Couldn't get country dode", error })
  }
  return res.status(200).json({ message: 'Country code found' })
}
