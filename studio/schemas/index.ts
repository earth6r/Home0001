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
import flexWaitlistBlock from './blocks/flex-waitlist-block'
import calendarBlock from './blocks/calendar-block'
import video from './objects/video'
import videosBlock from './blocks/videos-block'
import messagingBlock from './blocks/messaging-block'
import divider from './objects/divider'
import textAndAccordionBlock from './blocks/text-and-accordion-block'
import brand from './documents/brand-page'
import embed from './objects/embed'
import cookiesToggle from './objects/cookies-toggle'
import buy from './documents/buy-page'

export const schemaTypes = [
  // objects
  link,
  accordion,
  color,
  cookiesToggle,
  coordinates,
  cta,
  divider,
  embed,
  figure,
  media,
  menuItem,
  seo,
  richText,
  plainText,
  textAndImage,
  tooltip,
  unitGroup,
  video,

  // modules
  inventoryModule,

  // blocks
  blockContent,
  accordionBlock,
  animatingBlock,
  calendarBlock,
  carouselBlock,
  propertyBlock,
  propertiesBlock,
  newsletterBlock,
  contactBlock,
  textBlock,
  textAndAccordionBlock,
  unitBlock,
  videosBlock,
  messagingBlock,
  waitlistBlock,
  flexWaitlistBlock,

  // documents
  brand,
  buy,
  city,
  menus,
  page,
  property,
  propertyType,
  unit,
  siteSettings,
]

export default schemaTypes
