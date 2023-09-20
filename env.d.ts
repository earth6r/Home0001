declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      NEXT_PUBLIC_BASE_URL: string
      NEXT_PUBLIC_STUDIO_URL: string
      NEXT_PUBLIC_SANITY_PROJECT_ID: string
      NEXT_PUBLIC_SANITY_DATASET: string
      SANITY_STUDIO_BASE_URL: string
      SANITY_STUDIO_NEXT_URL: string
      SANITY_STUDIO_API_PROJECT_ID: string
      SANITY_STUDIO_API_DATASET: string
      SANITY_STUDIO_PREVIEW_SECRET: string
      SANITY_API_TOKEN: string
      SANITY_PREVIEW_TOKEN: string
    }
  }
}

export {}
