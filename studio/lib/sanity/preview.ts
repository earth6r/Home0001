import { createClient } from 'next-sanity'
import { config } from './config'

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_PREVIEW_TOKEN,
  withCredentials: true,
})

/**
 * Helper function to return the correct version of the document.
 * In preview mode this returns the preview document
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterDataToSingleItem = (data: any): any => {
  if (!Array.isArray(data)) {
    return data
  }
  if (data.length === 1) {
    return data[0]
  }
  return data[0]
}

export default previewClient
