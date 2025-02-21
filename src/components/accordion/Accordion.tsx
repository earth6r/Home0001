import { useRef, type FC, HTMLAttributes, useState, useEffect } from 'react'
import classNames from 'classnames'
import type { Cta, RichText as RichTextType } from '@studio/gen/sanity-schema'
import { Disclosure, Transition } from '@headlessui/react'
import {
  RichText,
  SanityLink,
  SanityMedia,
  SanityMediaProps,
} from '@components/sanity'
import IconPlus from '@components/icons/IconPlus'
import IconMinus from '@components/icons/IconMinus'
import { SanityLinkType } from '@studio/lib'
import { sendGoogleEvent } from '@lib/util'
import { useLenis } from '@studio-freight/react-lenis'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { useRouter } from 'next/router'
import posthog from 'posthog-js'
import { isDesktop } from 'react-device-detect'

export interface AccordionProps extends HTMLAttributes<HTMLElement> {
  header?: string
  largeHeader?: boolean
  initialText?: RichTextType
  media?: SanityMediaProps
  text?: RichTextType
  cta?: Cta
  readMore?: boolean
  firstIndex?: boolean
  location?: { property: string; unit: string }
  open?: boolean
  openOnDesktop?: boolean
}

export const Accordion: FC<AccordionProps> = ({
  header,
  largeHeader,
  initialText,
  media,
  text,
  cta,
  location,
  readMore,
  open,
  openOnDesktop = false,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [openedOnce, setOpenedOnce] = useState(false)
  const lenis = useLenis()
  const { asPath } = useRouter()

  const beforeEnter = () => {
    if (ref.current) {
      ref.current.style.maxHeight = ref.current.scrollHeight + 'px'
      setTimeout(() => {
        if (ref.current)
          ref.current.style.maxHeight = ref.current.scrollHeight + 'px'
      }, 1000)
    }

    if (!openedOnce) {
      const options = {
        accordion_header: header || largeHeader,
        accordion_location: location || asPath,
      }
      sendGoogleEvent('opened accordion', options)
      posthog.capture('accordion_opened', options)
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
    <div className={classNames(className, readMore ? '' : 'border-black')}>
      <Disclosure defaultOpen={open || (isDesktop && openOnDesktop)}>
        {({ open }) => {
          return (
            <>
              <Disclosure.Button
                className={classNames(
                  readMore
                    ? ''
                    : 'flex justify-between items-start px-x py-yhalf',
                  className?.includes('border-x-0') ? 'pl-0' : null,
                  `w-full text-left`
                )}
              >
                {header && (
                  <h2
                    className={classNames(
                      readMore
                        ? largeHeader
                          ? 'text-h2'
                          : 'text-h4'
                        : 'w-[calc(100%-16px)] font-medium text-xs',
                      'uppercase'
                    )}
                  >
                    {header}
                  </h2>
                )}

                {readMore ? (
                  <div className={classNames(header ? 'pt-yhalf pr-x' : '')}>
                    {initialText && <RichText blocks={initialText} />}

                    <span
                      className={classNames(
                        open ? 'opacity-0 max-h-0 mt-0' : 'max-h-none mt-y',
                        'inline-block underline decoration-[2px] underline-offset-2 pb-[2px] text-sm font-sansText font-bold'
                      )}
                    >{`Read more`}</span>
                  </div>
                ) : (
                  <>
                    {open ? (
                      <IconMinus
                        className="w-[11px] mr-1 mt-[2px]"
                        width={8}
                        height={12}
                      />
                    ) : (
                      <IconPlus
                        className="relative w-[16px] top-[1px]"
                        width={16}
                        height={16}
                      />
                    )}
                  </>
                )}
              </Disclosure.Button>

              <Transition
                show={open}
                ref={ref}
                className={classNames(
                  open
                    ? 'overflow-visible md:overflow-hidden'
                    : 'overflow-hidden',
                  'will-change-[maxHeight]'
                )}
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
                  <div
                    className={classNames(
                      readMore ? 'md:pl-0' : 'pl-x pr-10 pt-2 pb-5 ',
                      ''
                    )}
                  >
                    {media && (
                      <SanityMedia
                        {...media}
                        imageProps={{
                          alt: media.alt || 'Media',
                        }}
                        className="md:hidden w-full h-auto object-contain select-none"
                      />
                    )}

                    {text && (
                      <RichText
                        blocks={text}
                        className={classNames(readMore ? 'md:pr-0' : '')}
                      />
                    )}

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

                    {readMore && (
                      <Disclosure.Button className="mt-y">
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

export default Accordion
