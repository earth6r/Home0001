import axios from 'axios'
import { saveError } from './save-error'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const convertUsdToEthPrice = async (usdPrice: string) => {
  try {
    return (await getCryptoPrices(usdPrice, 'eth')) as number
  } catch (error) {
    console.error(error)
    saveError(
      {
        error,
        additionalInfo: {
          usdPrice,
          unit: 'eth',
        },
      },
      'getCryptoPrices'
    )
    return -1
  }
}

export const convertUsdToBtcPrice = async (usdPrice: string) => {
  try {
    return (await getCryptoPrices(usdPrice, 'btc')) as number
  } catch (error) {
    console.error(error)
    saveError(
      {
        error,
        additionalInfo: {
          usdPrice,
          unit: 'btc',
        },
      },
      'getCryptoPrices'
    )
    return -1
  }
}

export const getCryptoPrices = async (
  usdPrice: string,
  unit: string
): Promise<number> => {
  const numberPrice = Number(usdPrice.replace(/[^0-9.-]+/g, ''))
  let response
  try {
    response = await axios.get(`${BASE_URL}/api/crypto/get-crypto-prices`)
  } catch (error) {
    console.error(error)
    saveError(
      {
        error,
        additionalInfo: {
          usdPrice,
          unit,
        },
      },
      'getCryptoPrices'
    )
    return -1
  }
  const bitcoinUSD = response.data.bitcoin
  const ethereumUSD = response.data.ethereum

  const ethPrice = numberPrice / ethereumUSD
  const btcPrice = numberPrice / bitcoinUSD

  if (unit === 'eth') {
    return ethPrice
  } else if (unit === 'btc') {
    return btcPrice
  } else {
    return -1
  }
}
