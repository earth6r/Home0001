import { type FC, memo, HTMLAttributes, useState, useRef } from 'react'
import { RichText } from '@components/sanity'
import classNames from 'classnames'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { Disclosure, Transition } from '@headlessui/react'

interface DetailsDropdownProps extends HTMLAttributes<HTMLDivElement> {
  details: RichTextType
  dropdownOpen?: boolean
}

const DetailsDropdown: FC<DetailsDropdownProps> = ({
  className,
  details,
  dropdownOpen = false,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const beforeEnter = () => {
    if (ref.current)
      ref.current.style.maxHeight = ref.current.scrollHeight + 'px'
  }

  return (
    <>
      <RichText
        blocks={details.slice(0, 5)}
        className="max-w-[500px] md:pr-0"
      />

      <Disclosure defaultOpen={dropdownOpen}>
        {({ open }) => {
          return (
            <>
              <Disclosure.Button
                className={classNames(
                  className,
                  open ? '!m-0' : '',
                  `w-full text-left`
                )}
              >
                {!open && (
                  <span className="inline-block underline decoration-[1.5px] underline-offset-2 font-medium mt-y md:mt-yhalf">
                    See all details
                  </span>
                )}
              </Disclosure.Button>

              <Transition
                show={open}
                ref={ref}
                className="will-change-[maxHeight]"
                enter="maxHeight duration-200 ease-in-out"
                enterFrom="max-h-0"
                beforeEnter={beforeEnter}
                leave="maxHeight duration-200 ease-in-out"
                beforeLeave={() => {
                  if (ref.current) ref.current.style.maxHeight = '0px'
                }}
              >
                <Disclosure.Panel>
                  <div>
                    <RichText
                      blocks={details.slice(5, details.length)}
                      className={classNames(
                        open ? '' : '',
                        'max-w-[500px] md:pr-0 mt-y md:mt-yhalf'
                      )}
                    />
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )
        }}
      </Disclosure>
    </>
  )
}

export default DetailsDropdown
