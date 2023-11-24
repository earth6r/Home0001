import type { FC } from 'react'
import { PortableText } from '@portabletext/react'
import type { SanityBlockElement } from '@components/sanity'
import { blockTypes, blockMarks, blockBlock } from '@components/sanity'
import {
  TextBlock,
  AccordionBlock,
  WaitlistBlock,
  CitiesBlock,
  NewsletterBlock,
  ContactBlock,
  CarouselBlock,
} from '.'

export const BlockContent: FC<SanityBlockElement> = ({
  blocks,
  grid,
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
              <AccordionBlock index={index} grid={grid} {...value} />
            ),
            carouselBlock: ({ index, value }) => (
              <CarouselBlock index={index} grid={grid} {...value} />
            ),
            citiesBlock: ({ index, value }) => (
              <CitiesBlock index={index} grid={grid} {...value} />
            ),
            newsletterBlock: ({ index, value }) => (
              <NewsletterBlock index={index} grid={grid} {...value} />
            ),
            textBlock: ({ index, value }) => (
              <TextBlock index={index} grid={grid} {...value} />
            ),
            waitlistBlock: ({ index, value }) => (
              <WaitlistBlock index={index} grid={grid} {...value} />
            ),
            contactBlock: ({ index, value }) => (
              <ContactBlock index={index} grid={grid} {...value} />
            ),
          },
          marks: blockMarks,
          block: blockBlock,
        }}
      />
    </div>
  ) : null

export default BlockContent
