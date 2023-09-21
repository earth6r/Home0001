import richText from './objects/rich-text'
import plainText from './objects/plain-text'
import blockContent from './objects/block-content'
import textBlock from './blocks/text-block'
import figuresBlock from './blocks/figures-block'
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

export const schemaTypes = [
  link,
  accordion,
  cta,
  accordionBlock,
  textBlock,
  figuresBlock,
  waitlistBlock,
  color,
  media,
  figure,
  seo,
  menuItem,
  menus,
  richText,
  plainText,
  blockContent,
  siteSettings,
  page,
]

export default schemaTypes
