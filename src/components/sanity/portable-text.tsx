import type { PortableTextBlockStyle } from '@portabletext/types'
import type {
  PortableTextReactComponents,
  PortableTextBlockComponent,
} from '@portabletext/react'
import { reactNodeToString } from '@lib/util'
import { SanityLink, SanityFigure } from '.'
import { SanityTooltip } from './tooltip'

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
  tooltip: ({ value }) => {
    return <SanityTooltip {...value} />
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
 * PortableText lists used globally
 */
export const blockLists: PortableTextReactComponents['list'] = {
  inventoryList: ({ children }) => <ul className="inventory">{children}</ul>,
}

/**
 * PortableText blocks used globally
 */
export const blockBlock: Record<
  PortableTextBlockStyle,
  PortableTextBlockComponent | undefined
> = {
  small: ({ children }) => <p className="small">{children}</p>,
}
