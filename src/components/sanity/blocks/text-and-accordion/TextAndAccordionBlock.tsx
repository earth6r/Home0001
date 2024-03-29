import { useState, type FC, use, useEffect } from 'react'
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
import IconRightArrowBold from '@components/icons/IconRightArrowBold'

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
      {copy && (
        <RichText blocks={copy} className={classNames('clear-both capital')} />
      )}

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

      {showAccordions && (
        <button onClick={() => setShowAccordions(false)} className="pt-y">
          <span
            className={classNames(
              'inline-block underline decoration-[2px] underline-offset-2 pb-[2px] text-sm font-sansText font-bold'
            )}
          >{`Read less`}</span>
        </button>
      )}
    </div>
  )
}

export const TextAndAccordionBlock: FC<TextAndAccordionBlockProps> = ({
  scrollHeader,
  header,
  items,
  className,
}) => {
  const [scrolled, setScrolled] = useState(false)

  const scrollDown = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top:
          window.innerWidth < 768
            ? window.innerHeight - 32
            : window.innerHeight - 80,
        behavior: 'smooth',
      })
      setScrolled(true)
    }
  }

  const handleScroll = () => {
    if (window.scrollY > 250) {
      setScrolled(true)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Block className={classNames(className)}>
      {scrollHeader && (
        <div className="flex flex-wrap md:grid md:grid-cols-2 h-[calc(100svh-var(--space-page))] mim-h-[600px] items-end md:items-center justify-center md:justify-normal">
          <RichText blocks={scrollHeader} />

          <IconRightArrowBold
            fill="black"
            onClick={scrollDown}
            className={classNames(
              scrolled ? 'opacity-0 pointer-events-none' : '',
              'w-[33px] md:w-[161px] mb-ydouble md:mb-0 md:ml-xdouble transform rotate-[90deg] origin-center cursor-pointer transition-opacity duration-200'
            )}
          />
        </div>
      )}

      <div className="grid md:grid-cols-2">
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
      </div>
    </Block>
  )
}

export default TextAndAccordionBlock
