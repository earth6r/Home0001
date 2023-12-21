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
import propertiesBlock from './blocks/properties-block'
import property from './documents/property'
import unit from './documents/unit'
import inventoryModule from './modules/inventory-module'
import propertyType from './documents/property-type'
import newsletterBlock from './blocks/newsletter-block'
import contactBlock from './blocks/contact-block'
import tooltip from './objects/tooltip'
import unitGroup from './objects/unit-group'
import carouselBlock from './blocks/carousel-block'
import animatingBlock from './blocks/animating-block'
import textAndImage from './objects/textAndImage'
import unitBlock from './blocks/unit-block'
import propertyBlock from './blocks/property-block'

export const schemaTypes = [
  // objects
  link,
  accordion,
  color,
  coordinates,
  cta,
  figure,
  media,
  menuItem,
  seo,
  richText,
  plainText,
  textAndImage,
  tooltip,
  unitGroup,

  // modules
  inventoryModule,

  // blocks
  blockContent,
  accordionBlock,
  animatingBlock,
  carouselBlock,
  propertyBlock,
  propertiesBlock,
  newsletterBlock,
  contactBlock,
  textBlock,
  unitBlock,
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
