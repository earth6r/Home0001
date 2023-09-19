import type { FC } from 'react'
import { PortableText } from '@portabletext/react'
import type { SanityBlockElement } from '@components/sanity'
import { blockTypes, blockMarks, blockBlock } from '@components/sanity'
import { TextBlock, FiguresBlock } from '.'

export const BlockContent: FC<SanityBlockElement> = ({
  blocks,
  className,
  style,
}) =>
  blocks ? (
    <div className={className} style={style}>
      <PortableText
        value={blocks}
        components={{
          types: {
            ...blockTypes,
            textBlock: ({ index, value }) => (
              <TextBlock index={index} {...value} />
            ),
            figuresBlock: ({ index, value }) => (
              <FiguresBlock index={index} {...value} />
            ),
          },
          marks: blockMarks,
          block: blockBlock,
        }}
      />
    </div>
  ) : null

export default BlockContent
