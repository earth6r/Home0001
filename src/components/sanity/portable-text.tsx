import type { PortableTextBlockStyle } from '@portabletext/types'
import type {
  PortableTextReactComponents,
  PortableTextBlockComponent,
} from '@portabletext/react'
import { reactNodeToString } from '@lib/util'
import { SanityLink, SanityMedia } from '.'
import { SanityTooltip } from './tooltip'
import { useCookiesPrefs } from '@contexts/cookies'
import { type FC, type HTMLAttributes } from 'react'
import { ImageCarousel } from '@components/carousel'
import { SanityInventoryModal } from './table-modal'

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

/**
 * PortableText types used globally
 */
export const blockTypes: Partial<PortableTextReactComponents['types']> = {
  media: ({ value }) => {
    return (
      <div>
        <SanityMedia
          imageProps={{
            alt: value?.alt || 'Media',
            lqip: (value?.image as any)?.asset?.metadata?.lqip,
          }}
          className="w-full h-auto object-cover"
          {...(value as any)}
        />
      </div>
    )
  },
  tooltip: ({ value }) => {
    return <SanityTooltip {...value} />
  },
  divider: () => {
    return <span className="block h-yhalf" />
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
        carousel={false}
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
  small: ({ children }) => <p className="small">{children}</p>,
  large: ({ children }) => <p className="large">{children}</p>,
}
