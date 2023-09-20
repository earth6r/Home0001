import groq from 'groq'
import type { SiteSettings } from '@gen/sanity-schema'
import {
  IMAGE_QUERY,
  previewClient,
  filterDataToSingleItem,
  LINK_QUERY,
} from '.'

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]{
    title,
    description,
    "image": image{
      ${IMAGE_QUERY}
    },
    siteDescription,
    siteKeywords,
    mainMenu->{
      items[]{
        _key,
        text,
        link{
          ${LINK_QUERY}
        }
      }
    },
  }
`

export const getSiteSettingsProps: () => Promise<
  SiteSettings | undefined
> = async () => {
  const data = await previewClient.fetch(SITE_SETTINGS_QUERY)
  if (!data) return undefined
  const settings = filterDataToSingleItem(data)
  return settings
}
