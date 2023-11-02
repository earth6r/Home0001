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
`

export const LINK_MARKDEFS_QUERY = `
  _type == "link" => {
    externalLink,
    "internalLink": @.internalLink.reference->{
      _type,
      slug,
    },
    "anchor": @.internalLink.anchor,
  },
`

export const CTA_QUERY = `
  text,
  "link": link{
    ${LINK_QUERY}
  },
`

export const UNITS_QUERY = `
  "propertyType": propertyType->{
    typeTitle,
    typeValue,
  },
  "headlineImage": headlineImage{
    ${MEDIA_QUERY}
  },
  "photographs": photographs[]{
    ...,
    ${MEDIA_QUERY}
  },
  "layoutImages": layoutImages[]{
    ...,
    ${MEDIA_QUERY}
  },
  "property": property->{
    ...,
    "location": location->{
      ...,
      title,
    },
  }
`

export const PROPERTIES_QUERY = `
  _id,
  "image": image{
    ${MEDIA_QUERY}
  },
  "propertyDetails": propertyDetails[]{
      ...,
      "text": text[]{
        ...,
        markDefs[]{
          ...,
          ${LINK_MARKDEFS_QUERY}
        },
      }
  },
  "unitsList": unitsList[]->{
    ...,
    ${UNITS_QUERY}
  },
`

export const CITY_QUERY = `
  _id,
  _type,
  title,
  active,
  "properties": properties[]->{
    ...,
    ${PROPERTIES_QUERY}
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
      }
    },
    "media": media{
      ${MEDIA_QUERY}
    },
    "figures": figures[]{
      ...,
      media{
        ${MEDIA_QUERY}
      },
      cta{
        ${CTA_QUERY}
      }
    },
    "citiesList": citiesList[]->{
      ${CITY_QUERY}
    }
  },
`
