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
import textAndImage from './objects/text-and-image'
import unitBlock from './blocks/unit-block'
import propertyBlock from './blocks/property-block'
import calendarBlock from './blocks/calendar-block'
import video from './objects/video'
import videosBlock from './blocks/videos-block'
import messagingBlock from './blocks/messaging-block'
import divider from './objects/divider'
import textAndAccordionBlock from './blocks/text-and-accordion-block'
import brand from './documents/brand-page'
import dividerBlock from './blocks/divider-block'
import fullbleedBlock from './blocks/fullbleed-block'
import embed from './objects/embed'
import cookiesToggle from './objects/cookies-toggle'
import buy from './documents/buy-page'
import tableBlock from './blocks/table-block'
import contentRow from './objects/content-row'
import rdPage from './documents/rd-page'
import carousel from './objects/carousel'
import imagesBlock from './blocks/images-block'
import propertyTypesBlock from './blocks/property-types-block'
import inventory from './documents/inventory'
import inventoryToggle from './objects/inventory-toggle'
import formBlock from './blocks/form-block'
import formField from './objects/form-field'
import dashboardBlock from './blocks/dashboard-block'
import dashboard from './documents/dashboard'
import accountBlock from './blocks/account-block'

export const schemaTypes = [
  // objects
  link,
  accordion,
  carousel,
  color,
  contentRow,
  cookiesToggle,
  coordinates,
  cta,
  divider,
  embed,
  formField,
  figure,
  inventoryToggle,
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
  dividerBlock,
  formBlock,
  fullbleedBlock,
  imagesBlock,
  propertyBlock,
  propertyTypesBlock,
  propertiesBlock,
  newsletterBlock,
  contactBlock,
  tableBlock,
  textBlock,
  textAndAccordionBlock,
  unitBlock,
  videosBlock,
  messagingBlock,
  dashboardBlock,
  accountBlock,

  // documents
  brand,
  buy,
  city,
  inventory,
  menus,
  page,
  property,
  propertyType,
  rdPage,
  unit,
  dashboard,
  siteSettings,
]

export default schemaTypes
