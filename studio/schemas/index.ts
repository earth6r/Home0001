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
import waitlistBlock from './blocks/waitlist-block'
import coordinates from './objects/coordinates'
import city from './documents/city'
import citiesBlock from './blocks/cities-block'
import property from './documents/property'
import unit from './documents/unit'
import inventoryModule from './modules/inventory-module'
import tableRow from './objects/table-row'
import propertyType from './documents/property-type'
import newsletterBlock from './blocks/newsletter-block'
import tooltip from './objects/tooltip'

export const schemaTypes = [
  // objects
  link,
  accordion,
  color,
  coordinates,
  cta,
  figure,
  tableRow,
  media,
  menuItem,
  seo,
  richText,
  plainText,
  tooltip,

  // modules
  inventoryModule,

  // blocks
  blockContent,
  accordionBlock,
  citiesBlock,
  newsletterBlock,
  textBlock,
  waitlistBlock,

  // documents
  city,
  menus,
  page,
  property,
  propertyType,
  unit,
  siteSettings,
]

export default schemaTypes
