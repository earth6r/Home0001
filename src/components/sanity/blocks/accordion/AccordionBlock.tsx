import type { FC } from 'react'
import classNames from 'classnames'
import type { AccordionBlock as AccordionBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block } from '@components/sanity'
import { Accordion } from '@components/accordion'

type AccordionBlockProps = Omit<SanityBlockElement, keyof AccordionBlockType> &
  AccordionBlockType

export const AccordionBlock: FC<AccordionBlockProps> = ({
  accordions,
  readMore,
  grid,
  columns = 3,
  bottomBorder,
  className,
}) => {
  return (
    <Block
      style={{
        gridTemplateColumns: columns
          ? `repeat(${columns}, minmax(0, 1fr))`
          : 'repeat(3, minmax(0, 1fr))',
      }}
      className={classNames(
        className,
        grid ? 'grid pr-menu' : '',
        bottomBorder ? 'pb-y -mb-y border-bottom' : '',
        columns && columns < 3 ? 'md:pr-0' : ''
      )}
    >
      <div
        style={{
          gridColumnStart: columns && columns > 2 ? 2 : 1,
        }}
        className={classNames(
          columns > 2 ? 'col-span-1' : 'col-span-2',
          'md:col-start-2 md:col-span-1'
        )}
      >
        {accordions &&
          accordions.length > 0 &&
          accordions.map(
            ({ _key, header, largeHeader, initialText, text, cta }) => (
              <Accordion
                key={_key}
                header={header}
                largeHeader={largeHeader}
                initialText={initialText}
                text={text}
                cta={cta}
                readMore={readMore}
                className="mt-yhalf first-of-type:mt-0"
              />
            )
          )}
      </div>
    </Block>
  )
}

export default AccordionBlock
