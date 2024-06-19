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

export const CITY_QUERY = `
  _id,
  _type,
  title,
  active,
  "propertyLink": propertyLink{
    ${LINK_QUERY}
  }
`

export const UNIT_QUERY = `
  _key,
  _id,
  slug,
  title,
  headerText,
  available,
  price,
  cryptoPrice,
  area,
  amenities,
  summary,
  factSheet,
  reserveFormCopy,
  confirmationCopy,
  dossierInventory,
  moreInfo,
  unitDetails,
  secondUnitDetails,
  calendarLink,
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

export const PROPERTY_QUERY = `
  _key,
  _id,
  title,
  slug,
  headerText,
  header,
  coordinates,
  "image": image{
    ${MEDIA_QUERY}
  },
  availableText,
  seo,
  "previewImage": previewImage{
    ${MEDIA_QUERY}
  },
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
  },
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
    "textAndImages": textAndImages[]{
      ...,
      "media": media{
        ${MEDIA_QUERY}
      },
    },
    "media": media{
      ${MEDIA_QUERY}
    },
    "citiesList": citiesList[]->{
      ${CITY_QUERY},
    },
    "properties": properties[]->{
      "cardImage": cardImage{
        ${MEDIA_QUERY}
      },
      longTitle,
      slug,
    },
    "propertyRef": propertyRef->{
      ${PROPERTY_QUERY}
    },
    "unitRef": unitRef->{
      ${UNIT_QUERY}
    },
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
  "cardImage": cardImage{
    ${MEDIA_QUERY}
  },
  "image": image{
    ${MEDIA_QUERY}
  },
  waitlistLinkText,
  availableText,
  "unitsList": unitsList[]->{
    _key,
    _id,
    slug,
    title,
    available,
    hidePrice,
    price,
    cryptoPrice,
    area,
    "photographs": photographs[]{
      ${MEDIA_QUERY}
    },
    photoLimit,
    "propertyType": propertyType->{
      typeTitle,
      typeValue,
    },
  },
  seo,
  "previewImage": previewImage{
    ${MEDIA_QUERY}
  },
  ${BODY_QUERY}
`

export const BUY_UNIT_QUERY = `
  _key,
  "unitsList": unitsList[]->{
    _key,
    _id,
    slug,
    title,
    price,
    area,
    "photographs": photographs[]{
      ${MEDIA_QUERY}
    },
    "file": closingDocuments{
      ${IMAGE_QUERY}
    },
  },
`
