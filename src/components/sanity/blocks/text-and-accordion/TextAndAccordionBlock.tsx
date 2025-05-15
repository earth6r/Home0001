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
import IconCirclePlus from '@components/icons/IconCirclePlus'
import IconCircleMinus from '@components/icons/IconCircleMinus'
import {
  useWaitlisModal,
  useAvailableModal,
  useInventoryModal,
} from '@contexts/modals'

type TextAndAccordionProps = {
  copy?: RichTextType
  accordions?: SanityKeyed<AccordionType>[]
  cta?: 'waitlist' | 'properties' | 'inventory'
  inventory?: any
}

type TextAndAccordionBlockProps = Omit<
  SanityBlockElement,
  keyof TextAndAccordionBlockType
> &
  TextAndAccordionBlockType

const TextAndAccordion: FC<TextAndAccordionProps> = ({
  copy,
  accordions,
  cta,
  inventory,
}) => {
  const [waitlistOpen, setWaitlistOpen] = useWaitlisModal()
  const [availableOpen, setAvailableOpen] = useAvailableModal()
  const [inventoryOpen, setInventoryOpen] = useInventoryModal()

  const [showAccordions, setShowAccordions] = useState(false)
  return (
    <div className="w-full">
      {copy && (
        <RichText blocks={copy} className={classNames('w-full capital mb-y')} />
      )}

      {accordions && !showAccordions && (
        <button
          onClick={() => setShowAccordions(true)}
          className={classNames('pr-x')}
        >
          <span
            className={classNames(
              'inline-block underline decoration-[2px] underline-offset-2 pb-[2px] text-sm font-sansText font-bold'
            )}
          >
            <IconCirclePlus width={16} />
          </span>
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
            className="w-full pt-y"
          />
        ))}

      {showAccordions && cta && (
        <div className="mt-y">
          <button
            onClick={
              cta === 'waitlist'
                ? setWaitlistOpen
                : cta === 'properties'
                ? setAvailableOpen
                : setInventoryOpen
            }
            className={classNames(
              'inline-flex justify-between items-center gap-[5px] relative px-[6px] pt-[3px] pb-[4px] bg-black text-white font-medium text-left uppercase border-black'
            )}
          >
            <IconRightArrowBold
              className="relative w-[14px] mt-[0.1em]"
              fill="white"
            />
            <span className="leading-none">
              {cta === 'waitlist'
                ? `Apply`
                : cta === 'properties'
                ? `Available Homes`
                : `View Inventory`}
            </span>
          </button>
        </div>
      )}

      {showAccordions && (
        <button onClick={() => setShowAccordions(false)} className="pt-y">
          <span
            className={classNames(
              'inline-block underline decoration-[2px] underline-offset-2 pb-[2px] text-sm font-sansText font-bold'
            )}
          >
            <IconCircleMinus width={16} />
          </span>
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
        <div className="flex flex-wrap lg:grid lg:grid-cols-1 h-[calc(100svh-var(--space-page))] min-h-[600px] items-end md:items-center justify-left md:justify-normal mb-ydouble md:mb-0 pr-menu">
          <RichText blocks={scrollHeader} />

          <IconRightArrowBold
            fill="black"
            onClick={scrollDown}
            className={classNames(
              scrolled ? 'opacity-0 pointer-events-none' : '',
              'w-[80px] mb-ydouble lg:ml-0 lg:my-10 transform rotate-[90deg] origin-center cursor-pointer transition-opacity duration-200'
            )}
          />
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-x mb-[96px]">
        {header && (
          <RichText
            blocks={header}
            className={classNames(
              'lg:inline lg:sticky lg:h-1/5 lg:top-[var(--header-height)] col-start-1 pr-menu lg:pr-x mb-ydouble'
            )}
          />
        )}
        <div className="lg:col-start-2 flex flex-wrap gap-[calc(var(--space-y)*4)] pr-menu">
          {items?.map(item => (
            <div key={item._key} className="w-full">
              <TextAndAccordion {...item} />
            </div>
          ))}
        </div>
      </div>
    </Block>
  )
}

export default TextAndAccordionBlock
