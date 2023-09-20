/* Sanity query partials for DRYness */

export const IMAGE_QUERY = `
  ...,
  "asset": asset{
    ...,
    _type == 'reference' => @->,
    _type != 'reference' => @,
  },
`

export const VIDEO_QUERY = `
  ...,
  "files": files[]{
    ...,
    "asset": asset{
      ...,
      _type == 'reference' => @->,
      _type != 'reference' => @,
    }
  },
  "poster": poster{
    ...,
    "asset": asset{
      ...,
      _type == 'reference' => @->,
      _type != 'reference' => @,
    }
  },
  "caption": caption{
    ...,
    "asset": asset{
      ...,
      _type == 'reference' => @->,
      _type != 'reference' => @,
    }
  },
`

export const MEDIA_QUERY = `
  ...,
  "image": image{
    ${IMAGE_QUERY}
  },
  "video": video{
    ${VIDEO_QUERY}
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
  },
`
