import { createClient } from 'next-sanity'
import config from './config'

export const client = createClient(config)

export const rwClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export default client
