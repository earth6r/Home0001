/* eslint-disable import/no-anonymous-default-export */
import { BiCarousel } from 'react-icons/bi'
import { BiCode, BiText } from 'react-icons/bi'
import { BsList } from 'react-icons/bs'
import { GrImage } from 'react-icons/gr'
import { MdInventory } from 'react-icons/md'
import { RxDividerHorizontal, RxSwitch } from 'react-icons/rx'

const IndentDecorator = (props: any) => {
  return <span style={{ paddingLeft: '16px' }}>{props.children}</span>
}

export default {
  name: 'richText',
  type: 'array',
  title: 'Rich Text',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Caption', value: 'caption' },
        { title: 'Small', value: 'small' },
        { title: 'Large', value: 'large' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Dash', value: 'dash', icon: BsList },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          {
            title: 'Indented',
            value: 'indented',
            icon: () => '→',
            component: IndentDecorator,
          },
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'link',
          },
          {
            name: 'anchor',
            title: 'Anchor',
            type: 'object',
            icon: () => '#',
            fields: [
              {
                name: 'anchorId',
                title: 'Anchor ID',
                type: 'string',
              },
            ],
          },
          {
            title: 'Inventory Toggle',
            name: 'inventoryToggle',
            type: 'inventoryToggle',
            icon: MdInventory,
          },
        ],
      },
      of: [
        {
          title: 'Carousel',
          name: 'carousel',
          type: 'carousel',
          icon: BiCarousel,
        },
        {
          title: 'Divider',
          name: 'divider',
          type: 'divider',
          icon: RxDividerHorizontal,
        },
        {
          title: 'Embed',
          name: 'embed',
          type: 'embed',
          icon: BiCode,
        },
        {
          title: 'Tooltip',
          name: 'tooltip',
          type: 'tooltip',
          icon: BiText,
        },
        {
          title: 'Cookies Toggle',
          name: 'cookiesToggle',
          type: 'cookiesToggle',
          icon: RxSwitch,
        },
      ],
    },
    {
      title: 'Media',
      name: 'media',
      type: 'media',
      blockEditor: {
        icon: GrImage,
      },
    },
  ],
}
