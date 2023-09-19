import groq from 'groq'
import type { SiteSettings } from '@gen/sanity-schema'
import { IMAGE_QUERY, previewClient, filterDataToSingleItem } from '.'

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]{
    title,
    description,
    "image": image{
      ${IMAGE_QUERY}
    },
    siteDescription,
    siteKeywords,
  }
`

export interface SiteSettingsProps {
  preview: boolean
}

export const getSiteSettingsProps: (
  props: SiteSettingsProps
) => Promise<SiteSettings | undefined> = async ({ preview = false }) => {
  const data = await previewClient.fetch(SITE_SETTINGS_QUERY)
  if (!data) return undefined
  const settings = filterDataToSingleItem(data, preview)
  return settings
}
