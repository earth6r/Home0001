import type { PortableTextBlockStyle } from '@portabletext/types'
import type {
  PortableTextReactComponents,
  PortableTextBlockComponent,
} from '@portabletext/react'
import { reactNodeToString } from '@lib/util'
import { SanityLink, SanityMedia } from '.'
import { SanityTooltip } from './tooltip'

/**
 * PortableText types used globally
 */
export const blockTypes: Partial<PortableTextReactComponents['types']> = {
  media: ({ value }) => {
    return (
      <div className={`max-w-[273px] md:max-w-[522px] mx-auto text-center`}>
        <SanityMedia
          imageProps={{
            alt: value?.alt || 'Building image',
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
