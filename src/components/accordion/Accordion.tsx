import { useRef, type FC, useEffect, HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import type { Cta, RichText as RichTextType } from '@studio/gen/sanity-schema'
import { Disclosure, Transition } from '@headlessui/react'
import { RichText, SanityLink } from '@components/sanity'
import IconPlus from '@components/icons/IconPlus'
import IconMinus from '@components/icons/IconMinus'
import IconSmallBlackArrow, {
  IconSmallArrow,
} from '@components/icons/IconSmallBlackArrow'
import { SanityLinkType } from '@studio/lib'
import { sendGoogleEvent } from '@lib/util'

interface AccordionProps extends HTMLAttributes<HTMLElement> {
  header?: string
  initialText?: RichTextType
  text?: RichTextType
  cta?: Cta
  readMore?: boolean
  location?: { property: string; unit: string }
}

export const Accordion: FC<AccordionProps> = ({
  header,
  initialText,
  text,
  cta,
  location,
  readMore,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [openedOnce, setOpenedOnce] = useState(false)

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

  return (
    <div className={classNames(className, readMore ? '' : 'border-black')}>
      <Disclosure>
        {({ open }) => {
          return (
            <>
              <Disclosure.Button
                className={classNames(
                  readMore ? '' : 'flex justify-between items-center p-4',
                  className?.includes('border-x-0') ? 'pl-0' : null,
                  `w-full text-left`
                )}
              >
                <h2
                  className={classNames(
                    readMore
                      ? 'text-lg font-bold tracking-details'
                      : 'font-medium text-xs',
                    'uppercase'
                  )}
                >
                  {header}
                </h2>

                {readMore ? (
                  <div className="pr-menu md:pr-fullmenu pt-yhalf md:pt-yquarter">
                    {initialText && <RichText blocks={initialText} />}

                    <span
                      className={classNames(
                        open ? 'opacity-0 max-h-0 mt-0' : 'max-h-none mt-[1em]',
                        'inline-block underline underline-offset-2 text-sm font-medium'
                      )}
                    >{`Read more`}</span>
                  </div>
                ) : (
                  <>
                    {open ? (
                      <IconMinus width="8" height="12" />
                    ) : (
                      <IconPlus width="12" height="12" />
                    )}
                  </>
                )}
              </Disclosure.Button>

              <Transition
                show={open}
                ref={ref}
                className="overflow-hidden will-change-[maxHeight]"
                enter="maxHeight duration-200 ease-in-out"
                enterFrom="max-h-0"
                beforeEnter={beforeEnter}
                leave="maxHeight duration-200 ease-in-out"
                beforeLeave={() => {
                  if (ref.current) ref.current.style.maxHeight = '0px'
                }}
              >
                <Disclosure.Panel>
                  <div
                    className={classNames(
                      readMore
                        ? 'pr-fullmenu md:pl-0'
                        : 'pl-x pr-10 pt-2 pb-5 ',
                      ''
                    )}
                  >
                    {text && (
                      <RichText
                        blocks={text}
                        className={classNames(
                          readMore ? 'pr-menu md:pr-0' : ''
                        )}
                      />
                    )}

                    {cta && (
                      <div className="cta w-full relative mt-y pr-menu pd:mr-0">
                        <SanityLink
                          {...(cta.link as SanityLinkType)}
                          className="w-full border-1 border-black border-solid flex flex-row justify-between items-center bg-black text-white font-medium text-xs z-above px-4 py-3.5"
                        >
                          <span className="text-left uppercase leading-none">
                            {cta.text || 'Learn more'}
                          </span>
                          <IconSmallArrow width="16" fill="white" />
                        </SanityLink>
                      </div>
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
