import {
  useEffect,
  useRef,
  useState,
  type FC,
  type HTMLAttributes,
} from 'react'
import classNames from 'classnames'
import type { AccordionRowBlock as AccordionRowBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText, SanityLink } from '@components/sanity'
import { Accordion } from '@components/accordion'
import type { Cta, RichText as RichTextType } from '@studio/gen/sanity-schema'
import { Disclosure, Transition } from '@headlessui/react'
import { useLenis } from '@studio-freight/react-lenis'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { SanityLinkType } from '@studio/lib'
import { sendGoogleEvent } from '@lib/util'

interface AccordionRowProps extends HTMLAttributes<HTMLElement> {
  header?: string
  largeHeader?: boolean
  initialText?: RichTextType
  text?: RichTextType
  cta?: Cta
  open?: boolean
  setToOpen?: () => void
  setToClose?: () => void
  showReadMore?: boolean
}

type AccordionRowBlockProps = Omit<
  SanityBlockElement,
  keyof AccordionRowBlockType
> &
  AccordionRowBlockType

const AccordionRow: FC<AccordionRowProps> = ({
  header,
  largeHeader,
  initialText,
  text,
  cta,
  open,
  showReadMore,
  className,
  setToOpen,
  setToClose,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [openedOnce, setOpenedOnce] = useState(false)
  const lenis = useLenis()

  const beforeEnter = () => {
    if (ref.current)
      ref.current.style.maxHeight = ref.current.scrollHeight + 'px'

    if (!openedOnce) {
      const options = {
        accordion_header: header,
        accordion_location: location,
      }
      sendGoogleEvent('opened accordion', options)
      setOpenedOnce(true)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const resizeAccordion = () => {
        if (ref.current) {
          ref.current.style.maxHeight = ref.current.scrollHeight + 'px'
        }
      }

      window.addEventListener('resize', resizeAccordion)

      return () => {
        window.removeEventListener('resize', resizeAccordion)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={className}>
      <Disclosure defaultOpen={open}>
        {({ open }) => {
          return (
            <>
              <Disclosure.Button
                onClick={setToOpen}
                className={classNames(
                  className?.includes('border-x-0') ? 'pl-0' : null,
                  `w-full text-left`
                )}
              >
                {header && (
                  <h2
                    className={classNames(
                      largeHeader ? 'text-h2' : 'text-h4',
                      'uppercase'
                    )}
                  >
                    {header}
                  </h2>
                )}

                {showReadMore && (
                  <div className={classNames(header ? 'pt-yhalf pr-x' : '')}>
                    {initialText && <RichText blocks={initialText} />}

                    <span
                      className={classNames(
                        open ? 'opacity-0 max-h-0 mt-0' : 'max-h-none mt-y',
                        'inline-block underline decoration-[2px] underline-offset-2 pb-[2px] text-sm font-sansText font-bold'
                      )}
                    >{`Read more`}</span>
                  </div>
                )}
              </Disclosure.Button>

              <Transition
                show={open}
                ref={ref}
                className="overflow-hidden will-change-[maxHeight]"
                enter="maxHeight duration-200 ease-in-out"
                enterFrom="max-h-0"
                beforeEnter={beforeEnter}
                afterEnter={() => lenis.resize()}
                leave="maxHeight duration-200 ease-in-out"
                afterLeave={() => lenis.resize()}
                beforeLeave={() => {
                  if (ref.current) ref.current.style.maxHeight = '0px'
                }}
              >
                <Disclosure.Panel>
                  <div>
                    {text && <RichText blocks={text} className="md:pr-0" />}

                    {cta && (
                      <div className="cta w-full relative mt-y">
                        <SanityLink
                          {...(cta.link as SanityLinkType)}
                          className="w-full md:max-w-[var(--btn-width)] border-1 border-black hover:border-white border-solidd flex flex-row justify-between items-center bg-black text-white hover:invert text-button z-above px-4 py-3.5"
                        >
                          <span className="text-left uppercase leading-none">
                            {cta.text || 'Learn more'}
                          </span>
                          <IconSmallArrow width="16" height="10" fill="white" />
                        </SanityLink>
                      </div>
                    )}

                    {showReadMore && (
                      <Disclosure.Button onClick={setToClose} className="mt-y">
                        <span
                          className={classNames(
                            'inline-block underline decoration-[2px] underline-offset-2 pb-[2px] text-sm font-sansText font-bold'
                          )}
                        >{`Read less`}</span>
                      </Disclosure.Button>
                    )}
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )
        }}
      </Disclosure>
    </div>
  )
}

export const AccordionRowBlock: FC<AccordionRowBlockProps> = ({
  accordions,
  header,
  bottomBorder,
  className,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Block
      className={classNames(
        className,
        bottomBorder ? 'pb-y border-bottom' : '',
        'grid grid-cols-1 md:grid-cols-2'
      )}
    >
      <div>
        {header && <RichText className="mb-y" blocks={header} />}

        {accordions &&
          accordions.length > 0 &&
          accordions
            .slice(0, 1)
            .map(
              (
                { _key, header, largeHeader, initialText, text, cta },
                index
              ) => (
                <AccordionRow
                  key={_key}
                  header={header}
                  largeHeader={largeHeader}
                  initialText={initialText}
                  showReadMore={false}
                  text={text}
                  cta={cta}
                  open={open}
                />
              )
            )}
      </div>

      {accordions &&
        accordions.length > 0 &&
        accordions
          .slice(1, 2)
          .map(
            ({ _key, header, largeHeader, initialText, text, cta }, index) => (
              <AccordionRow
                key={_key}
                header={header}
                largeHeader={largeHeader}
                initialText={initialText}
                showReadMore={true}
                text={text}
                cta={cta}
                setToOpen={() => setOpen(true)}
                setToClose={() => setOpen(false)}
              />
            )
          )}
    </Block>
  )
}

export default AccordionRowBlock
