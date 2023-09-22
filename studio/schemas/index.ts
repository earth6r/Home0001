import richText from './objects/rich-text'
import plainText from './objects/plain-text'
import blockContent from './objects/block-content'
import textBlock from './blocks/text-block'
import color from './objects/color'
import link from './objects/link'
import cta from './objects/cta'
import media from './objects/media'
import figure from './objects/figure'
import menuItem from './objects/menu-item'
import seo from './objects/seo'
import page from './documents/page'
import menus from './documents/menus'
import siteSettings from './documents/site-settings'
import accordionBlock from './blocks/accordion-block'
import accordion from './objects/accordion'
import waitlistBlock from './blocks/waitlistBlock'
import coordinates from './objects/coordinates'
import city from './documents/city'
import citiesBlock from './blocks/cities-block'
import property from './documents/property'

export const schemaTypes = [
  // objects
  link,
  accordion,
  cta,
  coordinates,
  color,
  media,
  figure,
  seo,
  menuItem,
  richText,
  plainText,

  // blocks
  blockContent,
  accordionBlock,
  citiesBlock,
  textBlock,
  waitlistBlock,

  // documents
  city,
  menus,
  page,
  property,
  siteSettings,
]

export default schemaTypes
