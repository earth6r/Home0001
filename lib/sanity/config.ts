import type { ClientConfig, ProjectConfig } from 'next-sanity'

export const config: ClientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-12-01',
  useCdn: process.env.NODE_ENV === 'production',
}

export const projectConfig: ProjectConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
}

export default config
