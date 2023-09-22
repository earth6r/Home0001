import type { PortableTextBlockStyle } from '@portabletext/types'
import type {
  PortableTextReactComponents,
  // PortableTextBlockComponent,
} from '@portabletext/react'
import { reactNodeToString } from '@lib/util'
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
}

/**
 * PortableText blocks used globally
 */
// export const blockBlock: Record<
//   PortableTextBlockStyle,
//   PortableTextBlockComponent | undefined
// > = {
//   center: ({ children }) => <div className="text-center">{children}</div>,
// }
