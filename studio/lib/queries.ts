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
  color,
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

export const PROPERTY_QUERY = `
  _key,
  _id,
  title,
  slug,
  headerText,
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
        "inventory": inventory->{
          ...,
          items[]{
            ...,
            "image": image{
              ${IMAGE_QUERY}
            },
          }, 
        },
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

export const UNIT_QUERY = `
  _key,
  _id,
  slug,
  title,
  hideMenuButton,
  showTourLink,
  headerText,
  available,
  coordinates,
  address,
  bedrooms,
  bathrooms,
  price,
  cryptoPrice,
  area,
  summary,
  factSheet,
  "ctas": ctas[]{
    ${CTA_QUERY}
  },
  "inventory": inventory->{
    ...,
    items[]{
      ...,
      "image": image{
        ${IMAGE_QUERY}
      },
    }, 
  },
  "unitDetails": unitDetails[]{
    ...,
    "image": image{
      ${IMAGE_QUERY}
    },
    "children": children[]{
      ...,
      "images": images[]{
        ...,
        "image": image{
          ${IMAGE_QUERY}
        },
      }, 
    }, 
  },
  "propertyType": propertyType->{
    typeTitle,
    typeValue,
  },
  "photographs": photographs[]{
    ${MEDIA_QUERY}
  },
  "layoutImages": layoutImages[]{
    ${MEDIA_QUERY}
  },
  seo,
  "previewImage": previewImage{
    ${MEDIA_QUERY}
  },
`

export const BODY_QUERY = `
  "body": body[]{
    ...,
    "text": text[]{
      ...,
      "markDefs": coalesce(text[].markDefs, [])[]{
        ...,
        "inventory": inventory->{
          ...,
          items[]{
            ...,
            "image": image{
              ${IMAGE_QUERY}
            },
          }, 
        },
        ${LINK_MARKDEFS_QUERY}
      },
      cta{
        ${CTA_QUERY}
      },
    },
    "accordion": accordion{
      ...,
      "text": text[]{
        ...,
        _type,
        style,
        _key,
        children[]{
          ...,
          "images": images[]{
            ...,
            "image": image{
              ${IMAGE_QUERY}
            },
          },
          markDefs[]{
            ...,
            ${LINK_MARKDEFS_QUERY}
          },
        },
        markDefs[]{
          ...,
          ${LINK_MARKDEFS_QUERY}
        },
      },
      cta{
        ${CTA_QUERY}
      }
    },
    "inventory": inventory->{
      ...,
      items[]{
        ...,
        "image": image{
          ${IMAGE_QUERY}
        },
      }, 
    },
    "items": items[]{

      ...,
      copy[]{
        ...,
        children[]{
          ...,
          link{
            ${LINK_QUERY}
          }
        }
      }
    },
    "accordions": select(
      count(^.body[
          (_type == "accordionBlock") || 
          (_type == "textAndAccordionsBlock")
        ]) > 0 =>
        accordions[]{
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
      null
    ),
    "textAndImages": select(
      count(^.body[_type == "animatingBlock"]) > 0 => 
        textAndImages[]{
          ...,
          "media": media{
            ${MEDIA_QUERY}
          },
          "text": text[]{
            ...,
            markDefs[]{
              ...,
              "inventory": inventory->{
                ...,
                items[]{
                  ...,
                  "image": image{
                    ${IMAGE_QUERY}
                  },
                }, 
              },
              ${LINK_MARKDEFS_QUERY}
            },
          },
        },
      null
    ),
    "media": media{
      ${MEDIA_QUERY}
    },
    "citiesList": select(
      count(^.body[_type == "animatingBlock"]) > 0 => 
        citiesList[]->{
          ${CITY_QUERY},
        },
      null
    ),
    "properties": properties[]->{
      longTitle,
      slug,
      available,
    },
    "featuredList": select(
      count(^.body[_type == "animatingBlock"]) > 0 =>
        featuredList[]->{
          _key,
          _id,
          slug,
          typeTitle,
          available,
          price,
          area,
          "property": property->{
            headerText,
            slug,
            "location": location->{
              title,
            },
          },
          "photographs": photographs[]{
            ${MEDIA_QUERY}
          },
        },
      null
    ),
    "propertyRef": select(
      count(^.body[_type == "propertyBlock"]) > 0 =>
        propertyRef->{
          ${PROPERTY_QUERY}
        },
      null
    ),
    "unitRef": select(
      count(^.body[_type == "unitBlock"]) > 0 =>
        unitRef->{
          ${UNIT_QUERY}
        },
      null
    ),
    dashboardMenu->{
      items[]{
        _key,
        text,
        link{
          ${LINK_QUERY}
        }
      }
    },
  },
`

export const PROPERTY_TYPE_QUERY = `
  _key,
  _id,
  slug,
  typeTitle,
  headerText,
  available,
  price,
  area,
  summary,
  moreInfo,
  "inventory": inventory->{
    ...,
    items[]{
      ...,
      "image": image{
        ${IMAGE_QUERY}
      },
    }, 
  },
  unitDetails,
  "photographs": photographs[]{
    ${MEDIA_QUERY}
  },
  "layoutImages": layoutImages[]{
    ${MEDIA_QUERY}
  },
  "property": property->{
    headerText,
    title,
    slug,
    "location": location->{
      title,
    },
    "propertyImages": propertyImages[]{
      ${MEDIA_QUERY}
    },
    "propertyTypesList": propertyTypesList[]->{
      _key,
      _id,
      slug,
      typeTitle,
      available,
      price,
      area,
      "photographs": photographs[]{
        ${MEDIA_QUERY}
      },
    },
  },
  seo,
  "previewImage": previewImage{
    ${MEDIA_QUERY}
  },
  ${BODY_QUERY}
`

export const PROPERTIES_QUERY = `
  _key,
  _id,
  title,
  slug,
  longTitle,
  available,
  headerText,
  header,
  "propertyTypesList": propertyTypesList[]->{
    _key,
    _id,
    slug,
    typeTitle,
    available,
    price,
    area,
    "photographs": photographs[]{
      ${MEDIA_QUERY}
    },
  },
  "location": location->{
    title,
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
    factSheet,
    "inventory": inventory->{
      ...,
      items[]{
        ...,
        "image": image{
          ${IMAGE_QUERY}
        },
      }, 
    },
    "dossierRef": dossierRef->{
      slug,
    },
    "property": property->{
      header,
    },
    "photographs": photographs[][0]{
      ${MEDIA_QUERY}
    },
    "file": closingDocuments{
      ${IMAGE_QUERY}
    },
  },
`
