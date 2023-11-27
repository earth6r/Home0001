/* Sanity query partials for DRYness */

export const IMAGE_QUERY = `
  ...,
  "asset": asset{
    ...,
    _type == 'reference' => @->,
    _type != 'reference' => @,
  },
`
export const MEDIA_QUERY = `
  ...,
  "image": image{
    ${IMAGE_QUERY}
  },
`

export const LINK_QUERY = `
  externalLink,
  "internalLink": internalLink.reference->{
    _type,
    slug,
  },
  "anchor": internalLink.anchor,
  "query": internalLink.query,
`

export const LINK_MARKDEFS_QUERY = `
  _type == "link" => {
    externalLink,
    "internalLink": @.internalLink.reference->{
      _type,
      slug,
    },
    "anchor": @.internalLink.anchor,
    "query": @.internalLink.query,
  },
`

export const CTA_QUERY = `
  text,
  "link": link{
    ${LINK_QUERY}
  },
`

export const UNIT_QUERY = `
  _key,
  _id,
  slug,
  title,
  headerText,
  available,
  price,
  area,
  amenities,
  summary,
  factSheet,
  reserveFormCopy,
  confirmationCopy,
  moreInfo,
  unitDetails,
  secondUnitDetails,
  "propertyType": propertyType->{
    typeTitle,
    typeValue,
  },
  "headlineImage": headlineImage{
    ${MEDIA_QUERY}
  },
  "photographs": photographs[]{
    ${MEDIA_QUERY}
  },
  "layoutImages": layoutImages[]{
    ${MEDIA_QUERY}
  },
  "property": property->{
    headerText,
    slug,
    "location": location->{
      title,
    },
  },
  seo,
  "previewImage": previewImage{
    ${MEDIA_QUERY}
  },
`

export const PROPERTIES_QUERY = `
  _key,
  _id,
  title,
  slug,
  longTitle,
  headerText,
  header,
  coordinates,
  "image": image{
    ${MEDIA_QUERY}
  },
  body,
  waitlistLinkText,
  availableText,
  "unitsList": unitsList[]->{
    _key,
    slug,
    title,
    available,
    price,
    area,
    "photographs": photographs[]{
      ${MEDIA_QUERY}
    },
  },
  seo,
  "previewImage": previewImage{
    ${MEDIA_QUERY}
  },
`

export const CITY_QUERY = `
  _id,
  _type,
  title,
  active,
  "propertyLink": propertyLink{
    ${LINK_QUERY}
  }
`

export const BODY_QUERY = `
  "body": body[]{
    ...,
    "text": text[]{
      ...,
      markDefs[]{
        ...,
        ${LINK_MARKDEFS_QUERY}
      },
    },
    "accordions": accordions[]{
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
    "media": media{
      ${MEDIA_QUERY}
    },
    "citiesList": citiesList[]->{
      ${CITY_QUERY},
    },
    "properties": properties[]->{
      "image": image{
        ${MEDIA_QUERY}
      },
      longTitle,
      slug,
    },
  },
`
