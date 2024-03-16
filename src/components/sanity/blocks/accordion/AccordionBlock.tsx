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
  className,
}) => {
  return (
    <Block
      className={classNames(
        className,
        grid ? 'md:grid md:grid-cols-3 pr-menu' : ''
      )}
    >
      <div className="md:col-start-2 md:col-span-1" datatype="accordion-block">
        {accordions &&
          accordions.length > 0 &&
          accordions.map(({ _key, header, initialText, text, cta }) => (
            <Accordion
              key={_key}
              header={header}
              initialText={initialText}
              text={text}
              cta={cta}
              readMore={readMore}
              className="mt-2 first-of-type:mt-0"
            />
          ))}
      </div>
    </Block>
  )
}

export default AccordionBlock
