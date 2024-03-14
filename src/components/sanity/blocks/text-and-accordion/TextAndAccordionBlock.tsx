import type { FC } from 'react'
import classNames from 'classnames'
import type { TextAndAccordionBlock as TextAndAccordionBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'
import { Accordion } from '@components/accordion'

type TextAndAccordionBlockProps = Omit<
  SanityBlockElement,
  keyof TextAndAccordionBlockType
> &
  TextAndAccordionBlockType

export const TextAndAccordionBlock: FC<TextAndAccordionBlockProps> = ({
  header,
  items,
  grid,
  className,
}) => {
  return (
    <Block className={classNames(className, grid ? 'grid grid-cols-2' : '')}>
      {header && (
        <RichText
          blocks={header}
          className={classNames(
            'md:inline md:sticky md:h-[1em] md:top-[var(--header-height)] col-start-1 clear-both md:pr-x'
          )}
        />
      )}
      <div className="md:col-start-2">
        {items?.map(({ _key, copy, accordions }) => (
          <div key={_key}>
            {copy && (
              <RichText blocks={copy} className={classNames('clear-both')} />
            )}
            {accordions &&
              accordions.length > 0 &&
              accordions.map(({ _key, header, initialText, text, cta }) => (
                <Accordion
                  key={_key}
                  header={header}
                  initialText={initialText}
                  text={text}
                  cta={cta}
                  readMore={false}
                  className="mt-yhalf first-of-type:mt-0"
                />
              ))}
          </div>
        ))}
        )
      </div>
    </Block>
  )
}

export default TextAndAccordionBlock
