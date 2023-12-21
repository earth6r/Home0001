import { type FC, memo, HTMLAttributes, useState, useRef } from 'react'
import { RichText } from '@components/sanity'
import classNames from 'classnames'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { Disclosure, Transition } from '@headlessui/react'

interface DetailsDropdownProps extends HTMLAttributes<HTMLDivElement> {
  details: RichTextType
}

const DetailsDropdown: FC<DetailsDropdownProps> = ({ details }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [openedOnce, setOpenedOnce] = useState(false)

  const beforeEnter = () => {
    if (ref.current)
      ref.current.style.maxHeight = ref.current.scrollHeight + 'px'
  }

  return (
    <>
      <RichText
        blocks={details.slice(0, 5)}
        className="max-w-[500px] underlined"
      />

      <Disclosure>
        {({ open }) => {
          return (
            <>
              <Disclosure.Button className={classNames(`w-full text-left`)}>
                {!open && (
                  <span className="inline-block underline font-medium mt-y mb-ydouble">
                    See all details
                  </span>
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
                  <div>
                    <RichText
                      blocks={details.slice(5, details.length)}
                      className="max-w-[500px] underlined mb-ydouble"
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
