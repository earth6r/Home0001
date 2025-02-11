import groq from 'groq'
import type { SiteSettings } from '@gen/sanity-schema'
import {
  IMAGE_QUERY,
  previewClient,
  filterDataToSingleItem,
  LINK_QUERY,
  LINK_MARKDEFS_QUERY,
  CTA_QUERY,
} from '.'

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]{
    title,
    description,
    "image": image{
      ${IMAGE_QUERY}
    },
    "cookiesPaneCopy": cookiesPaneCopy[]{
      ...,
      markDefs[]{
        ...,
        ${LINK_MARKDEFS_QUERY}
      },   
    },
    "cookiesAccordions": cookiesAccordions[]{
      ...,
      "text": text[]{
        ...,
        markDefs[]{
          ...,
          ${LINK_MARKDEFS_QUERY}
        },
      },
      cta{
        ${CTA_QUERY}
      }
    },
    siteDescription,
    siteKeywords,
    "rdImage": rdImage{
      ${IMAGE_QUERY}
    },
    "rdLink": rdLink{
      ${LINK_QUERY}
    },
    mainMenu->{
      items[]{
        _key,
        text,
        link{
          ${LINK_QUERY}
        }
      }
    },
    footerMenu->{
      items[]{
        _key,
        text,
        link{
          ${LINK_QUERY}
        }
      }
    },
    applyCopy,
    waitlistHeader,
    waitlistCopy,
    waitlistSuccess,
    waitlistId,
    showConsent,
    consentCopy,
    inquiryId,
    inquiryCopy,
    inquirySuccess,
    brokerInquiryId,
    brokerInquiryCopy,
    brokerInquirySuccess,
    howItWorksContent,
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
