import type { PortableTextBlockStyle } from '@portabletext/types'
import type {
  PortableTextReactComponents,
  PortableTextBlockComponent,
} from '@portabletext/react'
import { reactNodeToString } from '@lib/util'
import { SanityLink, SanityMedia, SanityMediaProps } from '.'
import { SanityTooltip } from './tooltip'
import { useCookiesPrefs } from '@contexts/cookies'
import { type FC, type HTMLAttributes } from 'react'
import { ImageCarousel } from '@components/carousel'
import { SanityInventoryModal } from './table-modal'
import { Media } from '@studio/gen/sanity-schema'
import ImageZoom from '@components/image-zoom/ImageZoom'

interface SanityCookiesToggleProps extends HTMLAttributes<HTMLElement> {
  linkedCopy?: string
  cookiesToggle?: boolean
}

const SanityCookiesToggle: FC<SanityCookiesToggleProps> = ({
  className,
  ...props
}) => {
  const [showPrefs, setShowPrefs] = useCookiesPrefs()
  return (
    <button
      className="underline"
      onClick={() => {
        setShowPrefs(true)
      }}
    >
      {props.linkedCopy}
    </button>
  )
}

const SanityZoomMedia: FC<Media> = media => {
  return (
    <SanityMedia
      imageProps={{
        alt: media?.alt || 'Media',
        lqip: (media?.image as any)?.asset?.metadata?.lqip,
      }}
      className="w-full h-auto object-cover"
      {...(media as any)}
    />
  )
}

/**
 * PortableText types used globally
 */
export const blockTypes: Partial<PortableTextReactComponents['types']> = {
  media: ({ value }) => {
    return <SanityZoomMedia {...value} />
  },
  tooltip: ({ value }) => {
    return <SanityTooltip {...value} />
  },
  divider: () => {
    return <span className="block h-[2px]" />
  },
  embed: ({ value }) => {
    return <script type="text/javascript">{value.embed}</script>
  },
  cookiesToggle: ({ value }) => {
    return <SanityCookiesToggle {...value} />
  },
  carousel: ({ value }) => {
    return (
      <ImageCarousel
        slides={value.images}
        carousel={true}
        perView={2}
        className="w-full"
        placement="property details"
      />
    )
  },
}

/**
 * PortableText marks used globally
 */
export const blockMarks: Partial<PortableTextReactComponents['marks']> = {
  link: ({ children, value }) => {
    const text = reactNodeToString(children)
    return <SanityLink {...{ ...value, text }} />
  },
  anchor: ({ children, value }) => {
    return <span id={value.anchorId}>{children}</span>
  },
  indented: ({ children }) => {
    return <span className="indented">{children}</span>
  },
  inventoryToggle: ({ value }) => {
    return (
      value.inventory.items && (
        <SanityInventoryModal
          title="Inventory"
          inventory={value.inventory}
          buttonLabel={value.linkedCopy}
          className="inline"
          buttonType="link"
          unit={value.title}
        />
      )
    )
  },
}

/**
 * PortableText blocks used globally
 */
export const blockBlock: Record<
  PortableTextBlockStyle,
  PortableTextBlockComponent | undefined
> = {
  caption: ({ children }) => <p className="caption">{children}</p>,
  small: ({ children }) => <p className="small">{children}</p>,
  large: ({ children }) => <p className="large">{children}</p>,
}
