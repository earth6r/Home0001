import { useEffect, useState, type FC } from 'react'
import { PortableText } from '@portabletext/react'
import type { SanityBlockElement } from '@components/sanity'
import {
  blockTypes,
  blockMarks,
  blockBlock,
  blockLists,
} from '@components/sanity'
import {
  TextBlock,
  AccordionBlock,
  PropertiesBlock,
  NewsletterBlock,
  ContactBlock,
  CarouselBlock,
  AnimatingBlock,
  UnitBlock,
  PropertyBlock,
  CalendarBlock,
  TextAndAccordionBlock,
  VideosBlock,
  FullbleedBlock,
  MessagingBlock,
  TableBlock,
  ImagesBlock,
  PropertyTypesBlock,
  FormBlock,
  Web3Block,
} from '.'
import classNames from 'classnames'
import { useFeatureFlagEnabled } from 'posthog-js/react'
import { useRouter } from 'next/router'

export const BlockContent: FC<SanityBlockElement> = ({
  blocks,
  grid,
  className,
  style,
}) => {
  const flagEnabled = useFeatureFlagEnabled('alt-home')
  const router = useRouter()
  const [domain, setDomain] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomain(window.location.host)
    }
  }, [])

  return flagEnabled !== undefined && blocks ? (
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
              <>
                {flagEnabled
                  ? index === 1 && (
                      <AnimatingBlock index={index} grid={grid} {...value} />
                    )
                  : index === 0 && (
                      <AnimatingBlock index={index} grid={grid} {...value} />
                    )}
              </>
            ),
            calendarBlock: ({ index, value }) => (
              <CalendarBlock index={index} grid={grid} {...value} />
            ),
            carouselBlock: ({ index, value }) => (
              <CarouselBlock index={index} grid={grid} {...value} />
            ),
            dividerBlock: ({ value }) => (
              <div
                className={classNames(
                  domain?.includes('0001.studio') ||
                    router.asPath === '/rd' ||
                    router.asPath === '/about'
                    ? 'w-[calc(100%-var(--space-menu-sm))]'
                    : '',
                  value.borderEnabled
                    ? 'my-ydouble border-bottom'
                    : 'pb-ydouble',
                  ''
                )}
              ></div>
            ),
            fullbleedBlock: ({ index, value }) => (
              <FullbleedBlock
                index={index}
                grid={grid}
                {...value}
                className={classNames(
                  (blocks as any)[index - 1]?._type === 'imagesBlock' ||
                    (blocks as any)[index - 1]?._type === 'fullbleedBlock'
                    ? 'mt-yhalf'
                    : ''
                )}
              />
            ),
            formBlock: ({ index, value }) => (
              <FormBlock index={index} grid={grid} {...value} />
            ),
            imagesBlock: ({ index, value }) => (
              <ImagesBlock
                index={index}
                grid={grid}
                {...value}
                className={classNames(
                  (blocks as any)[index - 1]?._type === 'imagesBlock' ||
                    (blocks as any)[index - 1]?._type === 'fullbleedBlock'
                    ? 'mt-yhalf'
                    : ''
                )}
              />
            ),
            propertyBlock: ({ index, value }) => (
              <PropertyBlock index={index} grid={grid} {...value} />
            ),
            propertyTypesBlock: ({ index, value }) => (
              <PropertyTypesBlock index={index} grid={grid} {...value} />
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
            textBlock: ({ index, value }) => {
              return <TextBlock index={index} grid={grid} {...value} />
            },
            textAndAccordionBlock: ({ index, value }) => (
              <TextAndAccordionBlock index={index} {...value} />
            ),
            unitBlock: ({ index, value }) => (
              <UnitBlock index={index} grid={grid} {...value} />
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
            web3Block: ({ index, value }) => (
              <Web3Block index={index} {...value} />
            ),
          },
          marks: blockMarks,
          block: blockBlock,
          list: blockLists as any,
        }}
      />
    </div>
  ) : null
}

export default BlockContent
