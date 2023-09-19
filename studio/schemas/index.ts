import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
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
import video from './objects/video'
import page from './documents/page'
import menu from './documents/menu'
import siteSettings from './documents/site-settings'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    link,
    cta,
    textBlock,
    figuresBlock,
    color,
    video,
    media,
    figure,
    seo,
    menuItem,
    menu,
    richText,
    plainText,
    blockContent,
    siteSettings,
    page,
  ]),
})
