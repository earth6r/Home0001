import type { FC } from 'react'
import { HTMLAttributes, useRef } from 'react'
import classNames from 'classnames'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { RichText } from '@components/sanity'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { Transition } from '@headlessui/react'

interface PaneProps extends HTMLAttributes<HTMLElement> {
  enter?: boolean
  block?: boolean
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
  block,
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
        'flex flex-wrap items-stretch md:items-start relative w-full h-full'
      )}
    >
      <>
        <div className="w-full h-[calc(100%-var(--btn-height)-[6rem])] md:h-auto overflow-scroll">
          {header && (
            <h2
              className={classNames(
                block ? 'md:pr-menu' : '',
                largeHeader
                  ? 'text-xl'
                  : 'md:mt-y md:-mb-y text-lg pt-ylg md:pt-0',
                'pb-page uppercase font-bold'
              )}
            >
              {header || `Join the waitlist:`}
            </h2>
          )}

          <div
            className={classNames(
              block ? '' : 'md:grid md:grid-cols-2 md:gap-20',
              'md:w-full md:pr-menu'
            )}
          >
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

            <div
              className={classNames(
                block ? '' : 'md:min-h-[328px]',
                'relative flex flex-col gap-3 pb-y'
              )}
            >
              {children}
            </div>
          </div>
        </div>

        <div
          className={classNames(
            block ? 'md:w-full' : 'md:w-[calc(50%+4px)] md:ml-auto',
            'relative flex w-full h-btn bottom-0 md:bottom-auto md:pr-menu'
          )}
        >
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
            <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
          </button>
        </div>
      </>
    </Transition>
  )
}

export default Pane
