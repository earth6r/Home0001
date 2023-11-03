import { useRef, type FC, useEffect, HTMLAttributes } from 'react'
import classNames from 'classnames'
import type { Cta, RichText as RichTextType } from '@studio/gen/sanity-schema'
import { Disclosure, Transition } from '@headlessui/react'
import { RichText, SanityLink } from '@components/sanity'
import IconPlus from '@components/icons/IconPlus'
import IconMinus from '@components/icons/IconMinus'
import IconSmallBlackArrow from '@components/icons/IconSmallBlackArrow'
import { CTA_QUERY, SanityLinkType } from '@studio/lib'

interface AccordionProps extends HTMLAttributes<HTMLElement> {
  header?: string
  text?: RichTextType
  cta?: Cta
}

export const Accordion: FC<AccordionProps> = ({
  header,
  text,
  cta,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const setHeight = () => {
    if (ref.current)
      ref.current.style.maxHeight = ref.current.scrollHeight + 'px'
  }

  return (
    <div className={classNames(className, 'border-black')}>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`flex justify-between text-left ${
                className?.includes('border-x-0') ? 'pl-0' : null
              } items-center w-full p-4 `}
            >
              <h2 className="uppercase">{header}</h2>
              {open ? (
                <IconMinus width="8" height="12" />
              ) : (
                <IconPlus width="12" height="12" />
              )}
            </Disclosure.Button>
            <Transition
              show={open}
              ref={ref}
              className="overflow-hidden will-change-[maxHeight]"
              enter="maxHeight duration-200 ease-in-out"
              enterFrom="max-h-0"
              beforeEnter={setHeight}
              leave="maxHeight duration-200 ease-in-out"
              beforeLeave={() => {
                if (ref.current) ref.current.style.maxHeight = '0px'
              }}
            >
              <Disclosure.Panel>
                <div className="pt-2 pl-4 pr-10 md:pr-x pb-5">
                  {text && <RichText blocks={text} />}

                  {cta && (
                    <div className="flex h-[2em] mt-yhalf">
                      <IconSmallBlackArrow
                        width="13"
                        height="32"
                        className="mr-[3px]"
                      />
                      <SanityLink
                        text={cta.text}
                        {...(cta.link as SanityLinkType)}
                        className="hover:font-bold border-bottom mt-2 ml-2"
                      />
                    </div>
                  )}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default Accordion
