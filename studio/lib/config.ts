import type { ClientConfig } from 'next-sanity'

export const config: ClientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
}

export default config
