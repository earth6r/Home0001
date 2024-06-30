import axios from 'axios'
import { saveError } from './save-error'

const coinGeckoAPIKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY

const coinGeckoConfig = {
  headers: {
    'x-cg-demo-api-key': coinGeckoAPIKey,
  },
}
const coinGeckoEthPriceApiUrl = (coinId: string) => {
  const apiURL = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=eth`
  return apiURL
}
const coinGeckoBtcPriceApiUrl = (coinId: string) => {
  const apiURL = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=btc`
  return apiURL
}

export const convertUsdToEthPrice = async (usdPrice: string) => {
  const numberPrice = Number(usdPrice.replace(/[^0-9.-]+/g, ''))
  const apiURL = coinGeckoEthPriceApiUrl('usd-coin')

  try {
    const ethToUsdPrice = await axios.get(apiURL, coinGeckoConfig)
    const currentEthPriceOfUsd = ethToUsdPrice.data['usd-coin'].eth
    const priceInEth = numberPrice * currentEthPriceOfUsd
    return priceInEth
  } catch (error) {
    console.error(error)
    saveError(error, 'convertUsdToEthPrice')
    throw new Error('Failed to convert USD to ETH price')
  }
}
export const convertUsdToBtcPrice = async (usdPrice: string) => {
  try {
    const numberPrice = Number(usdPrice.replace(/[^0-9.-]+/g, ''))
    const apiURL = coinGeckoBtcPriceApiUrl('usd-coin')
    const btcToUsdPrice = await axios.get(apiURL, coinGeckoConfig)
    const currentBtcPriceOfUsd = btcToUsdPrice.data['usd-coin'].btc
    const priceInBtc = numberPrice * currentBtcPriceOfUsd
    return priceInBtc
  } catch (error) {
    console.error(error)
    saveError(error, 'convertUsdToBtcPrice')
    throw new Error('Failed to convert USD to BTC price')
  }
}
