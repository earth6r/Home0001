import type { FC } from 'react'
import { PortableText } from '@portabletext/react'
import type { SanityBlockElement } from '@components/sanity'
import { blockTypes, blockMarks, blockBlock } from '@components/sanity'
import {
  TextBlock,
  AccordionBlock,
  WaitlistBlock,
  PropertiesBlock,
  NewsletterBlock,
  ContactBlock,
  CarouselBlock,
  AnimatingBlock,
  UnitBlock,
  PropertyBlock,
  FlexWaitlistBlock,
  CalendarBlock,
  TextAndAccordionBlock,
  VideosBlock,
  FullbleedBlock,
  MessagingBlock,
  TableBlock,
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
            animatingBlock: ({ index, value }) => (
              <AnimatingBlock index={index} grid={grid} {...value} />
            ),
            calendarBlock: ({ index, value }) => (
              <CalendarBlock index={index} grid={grid} {...value} />
            ),
            carouselBlock: ({ index, value }) => (
              <CarouselBlock index={index} grid={grid} {...value} />
            ),
            dividerBlock: () => <div className="mt-block"></div>,
            fullbleedBlock: ({ index, value }) => (
              <FullbleedBlock index={index} grid={grid} {...value} />
            ),
            propertyBlock: ({ index, value }) => (
              <PropertyBlock index={index} grid={grid} {...value} />
            ),
            propertiesBlock: ({ index, value }) => (
              <PropertiesBlock index={index} grid={grid} {...value} />
            ),
            newsletterBlock: ({ index, value }) => (
              <NewsletterBlock index={index} grid={grid} {...value} />
            ),
            tableBlock: ({ index, value }) => (
              <TableBlock index={index} grid={grid} {...value} />
            ),
            textBlock: ({ index, value }) => (
              <TextBlock index={index} grid={grid} {...value} />
            ),
            textAndAccordionBlock: ({ index, value }) => (
              <TextAndAccordionBlock index={index} {...value} />
            ),
            unitBlock: ({ index, value }) => (
              <UnitBlock index={index} grid={grid} {...value} />
            ),
            waitlistBlock: ({ index, value }) => (
              <WaitlistBlock index={index} grid={grid} {...value} />
            ),
            flexWaitlistBlock: ({ index, value }) => (
              <FlexWaitlistBlock index={index} {...value} />
            ),
            contactBlock: ({ index, value }) => (
              <ContactBlock index={index} grid={grid} {...value} />
            ),
            videosBlock: ({ index, value }) => (
              <VideosBlock index={index} {...value} />
            ),
            messagingBlock: ({ index, value }) => (
              <MessagingBlock index={index} {...value} />
            ),
          },
          marks: blockMarks,
          block: blockBlock,
        }}
      />
    </div>
  ) : null

export default BlockContent
