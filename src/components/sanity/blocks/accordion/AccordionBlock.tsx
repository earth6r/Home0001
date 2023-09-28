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
  className,
}) => {
  return (
    <Block className={classNames(className, 'md:grid md:grid-cols-3 pr-menu')}>
      <div className="md:col-start-2 md:col-span-1 ">
        {accordions &&
          accordions.length > 0 &&
          accordions.map(({ _key, header, text }) => (
            <Accordion
              key={_key}
              header={header}
              text={text}
              className="mt-2 first-of-type:mt-0"
            />
          ))}
      </div>
    </Block>
  )
}

export default AccordionBlock
