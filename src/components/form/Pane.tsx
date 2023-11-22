import type { FC } from 'react'
import { HTMLAttributes, useRef } from 'react'
import classNames from 'classnames'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { RichText } from '@components/sanity'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { Transition } from '@headlessui/react'

interface PaneProps extends HTMLAttributes<HTMLElement> {
  enter?: boolean
  currentStep?: number
  header?: string
  copy?: RichTextType | string
  buttonCopy?: string
  buttonType?: 'button' | 'submit'
  onBack?: () => void
}

const Pane: FC<PaneProps> = ({
  enter = true,
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
            <h2 className="pb-ylg uppercase text-xs font-bold">
              {header || `Join waitlist`}
            </h2>
          )}

          {typeof copy === 'string' ? (
            <p>{copy}</p>
          ) : (
            copy && (
              <RichText
                blocks={copy}
                className={classNames('mb-ylg clear-both')}
              />
            )
          )}

          <div className="relative flex flex-col gap-4 pb-y">{children}</div>
        </div>

        <div className={classNames('relative flex w-full h-btn bottom-0')}>
          <div className="absolute w-full h-[175%] modal-gradient left-0 bottom-0 z-above" />

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
            className="relative flex justify-between items-center w-full px-x md:px-xhalf tracking-normal h-btn text-center tracking-caps uppercase text-white bg-black font-bold text-xs z-above"
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
