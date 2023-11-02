import { useRef, type FC, useEffect, HTMLAttributes } from 'react'
import classNames from 'classnames'
import type { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { Disclosure, Transition } from '@headlessui/react'
import { RichText } from '@components/sanity'
import IconPlus from '@components/icons/IconPlus'
import IconMinus from '@components/icons/IconMinus'

interface AccordionProps extends HTMLAttributes<HTMLElement> {
  header?: string
  text?: RichTextType
}

export const Accordion: FC<AccordionProps> = ({ header, text, className }) => {
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
              className={
                'flex justify-between text-left items-center w-full p-4 pl-0'
              }
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
                {text && (
                  <RichText
                    blocks={text}
                    className="pt-2 pl-4 pr-10 md:pr-x pb-5"
                  />
                )}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default Accordion
