import type { FC } from 'react'
import { HTMLAttributes, useRef } from 'react'
import classNames from 'classnames'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { RichText } from '@components/sanity'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { Transition } from '@headlessui/react'

interface PaneProps extends HTMLAttributes<HTMLElement> {
  enter?: boolean
  largeHeader?: boolean
  currentStep?: number
  header?: string
  copy?: RichTextType | string
  buttonCopy?: string
  buttonType?: 'button' | 'submit'
  onBack?: () => void
}

const Pane: FC<PaneProps> = ({
  enter = true,
  largeHeader,
  currentStep,
  header,
  copy,
  buttonCopy,
  buttonType,
  onClick,
  onBack,
  className,
  children,
}) => {
  return (
    <Transition
      show={enter}
      appear={true}
      enter="transition-all duration-700 ease-in-out"
      enterFrom="top-1 opacity-0"
      enterTo="top-0 opacity-100"
      leave="transition-all duration-700 ease-in-out"
      leaveFrom="top-0 opacity-100"
      leaveTo="top-1 opacity-0"
      className={classNames(
        className,
        'flex flex-wrap items-stretch relative w-full h-full'
      )}
    >
      <>
        <div className="w-full h-[calc(100%-var(--btn-height))] overflow-scroll">
          {header && (
            <h2
              className={classNames(
                largeHeader ? 'text-xl' : 'text-lg',
                'pt-ylg pb-page uppercase font-bold'
              )}
            >
              {header || `Join the waitlist:`}
            </h2>
          )}

          {typeof copy === 'string' ? (
            <p className="mb-ylg text-md font-medium">{copy}</p>
          ) : (
            copy && (
              <RichText
                blocks={copy}
                className={classNames('mb-ylg clear-both')}
              />
            )
          )}

          <div className="relative flex flex-col gap-3 pb-y">{children}</div>
        </div>

        <div className={classNames('relative flex w-full h-btn bottom-0')}>
          {currentStep && currentStep > 0 ? (
            <button
              className="relative flex justify-center items-center w-[48px] h-btn mr-2 bg-white border-black z-above"
              type={'button'}
              onClick={onBack}
            >
              <IconSmallArrow
                width="13"
                height="9"
                fill="black"
                className="transform rotate-180"
              />
            </button>
          ) : null}

          <button
            className="relative flex justify-between items-center w-full px-x md:px-xhalf tracking-details h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
            type={buttonType || 'submit'}
            onClick={onClick}
          >
            {buttonCopy || 'Submit'}
            <IconSmallArrow width="13" height="9" />
          </button>
        </div>
      </>
    </Transition>
  )
}

export default Pane
