import type { PortableTextBlockStyle } from '@portabletext/types'
import type {
  PortableTextReactComponents,
  PortableTextBlockComponent,
} from '@portabletext/react'
import { reactNodeToString } from '@lib/util'
import { getBlockHeading } from '@sanity/lib'
import { SanityLink, SanityFigure } from '.'

/**
 * PortableText types used globally
 */
export const blockTypes: Partial<PortableTextReactComponents['types']> = {
  media: ({ value }) => {
    return (
      <div className={`text-center ${value.alignment || 'center'}`}>
        <SanityFigure className="text-xs" {...value} />
      </div>
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
  join: ({ children }) => <span className="inline-block">{children}</span>,
}

/**
 * PortableText blocks used globally
 */
export const blockBlock: Record<
  PortableTextBlockStyle,
  PortableTextBlockComponent | undefined
> = {
  center: ({ children }) => <div className="text-center">{children}</div>,
  h2: ({ children, value }) => {
    const heading = getBlockHeading(value)
    return <h2 id={heading?.slug}>{children}</h2>
  },
}
