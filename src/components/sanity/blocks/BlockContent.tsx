import type { FC } from 'react'
import { PortableText } from '@portabletext/react'
import type { SanityBlockElement } from '@components/sanity'
import { blockTypes, blockMarks, blockBlock } from '@components/sanity'
import { TextBlock, AccordionBlock, WaitlistBlock, CitiesBlock } from '.'

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
            citiesBlock: ({ index, value }) => (
              <CitiesBlock index={index} {...value} />
            ),
            textBlock: ({ index, value }) => (
              <TextBlock index={index} {...value} />
            ),
            waitlistBlock: ({ index, value }) => (
              <WaitlistBlock index={index} {...value} />
            ),
          },
          marks: blockMarks,
          block: blockBlock,
        }}
      />
    </div>
  ) : null

export default BlockContent
