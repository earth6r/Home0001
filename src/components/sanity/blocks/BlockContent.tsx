import type { FC } from 'react'
import { PortableText } from '@portabletext/react'
import type { SanityBlockElement } from '@components/sanity'
import { blockTypes, blockMarks, blockBlock } from '@components/sanity'
import { TextBlock, FiguresBlock, AccordionBlock } from '.'

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
            accordionBlock: ({ index, value }) => (
              <AccordionBlock index={index} {...value} />
            ),
            figuresBlock: ({ index, value }) => (
              <FiguresBlock index={index} {...value} />
            ),
            textBlock: ({ index, value }) => (
              <TextBlock index={index} {...value} />
            ),
          },
          marks: blockMarks,
          block: blockBlock,
        }}
      />
    </div>
  ) : null

export default BlockContent
