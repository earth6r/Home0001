import axios from 'axios'

export const convertUsdToEthPrice = async (usdPrice: any) => {
  const coinGeckoApiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`

  const currentPrice = await axios.get(coinGeckoApiUrl)
  console.log('currentPrice:', currentPrice)
  return currentPrice
}
