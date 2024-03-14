import { useState, type FC } from 'react'
import classNames from 'classnames'
import type {
  Accordion as AccordionType,
  RichText as RichTextType,
  SanityKeyed,
  TextAndAccordionBlock as TextAndAccordionBlockType,
} from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'
import { Accordion } from '@components/accordion'

type TextAndAccordionProps = {
  copy?: RichTextType
  accordions?: SanityKeyed<AccordionType>[]
}

type TextAndAccordionBlockProps = Omit<
  SanityBlockElement,
  keyof TextAndAccordionBlockType
> &
  TextAndAccordionBlockType

const TextAndAccordion: FC<TextAndAccordionProps> = ({ copy, accordions }) => {
  const [showAccordions, setShowAccordions] = useState(false)
  return (
    <div>
      {copy && <RichText blocks={copy} className={classNames('clear-both')} />}

      {accordions && !showAccordions && (
        <button
          onClick={() => setShowAccordions(true)}
          className={classNames('pr-x pt-yhalf')}
        >
          <span
            className={classNames(
              'inline-block underline decoration-[2px] underline-offset-2 pb-[2px] text-sm font-sansText font-bold'
            )}
          >{`Read more`}</span>
        </button>
      )}

      {showAccordions &&
        accordions &&
        accordions.map(({ _key, header, initialText, text, cta }) => (
          <Accordion
            key={_key}
            header={header}
            initialText={initialText}
            text={text}
            cta={cta}
            readMore={false}
            className="w-btnWidth mt-yhalf first-of-type:mt-0"
          />
        ))}
    </div>
  )
}

export const TextAndAccordionBlock: FC<TextAndAccordionBlockProps> = ({
  header,
  items,
  grid,
  className,
}) => {
  return (
    <Block className={classNames(className, grid ? 'grid md:grid-cols-2' : '')}>
      {header && (
        <RichText
          blocks={header}
          className={classNames(
            'md:inline md:sticky md:h-1/5 md:top-[var(--header-height)] col-start-1 md:pr-x mb-ydouble'
          )}
        />
      )}
      <div className="md:col-start-2 flex flex-wrap gap-ydouble">
        {items?.map(({ _key, copy, accordions }) => (
          <div key={_key}>
            <TextAndAccordion copy={copy} accordions={accordions} />
          </div>
        ))}
      </div>
    </Block>
  )
}

export default TextAndAccordionBlock
