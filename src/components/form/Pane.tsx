import type { FC } from 'react'
import { HTMLAttributes } from 'react'
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
        <div
          className={classNames(
            block ? 'md:h-auto' : 'md:h-full',
            'w-full h-[calc(100%-var(--btn-height)-[6rem])] overflow-scroll'
          )}
        >
          {currentStep === 0 && (
            <h2
              className={classNames(
                largeHeader ? 'text-xl' : 'text-lg',
                'pb-8 md:pb-[32px] uppercase font-bold leading-[0.85] tracking-tight'
              )}
            >
              {header || `Join the waitlist:`}
            </h2>
          )}

          <div
            className={classNames(
              block ? '' : 'md:grid md:grid-cols-2 md:gap-20 h-full',
              largeHeader ? '' : 'md:mt-y md:-mb-y pt-0',
              'md:w-full md:pr-menu'
            )}
          >
            <div>
              {header && currentStep !== 0 && (
                <h2
                  className={classNames(
                    largeHeader ? 'text-lg' : 'text-lg',
                    'pb-8 md:pb-[32px] uppercase font-bold leading-[0.85] tracking-tight'
                  )}
                >
                  {header || `Join the waitlist:`}
                </h2>
              )}

              {currentStep === 0 && (
                <>
                  {typeof copy === 'string' ? (
                    <p className="mb-yhalf text-lg font-bold tracking-tight uppercase leading-[0.85]">
                      {copy}
                    </p>
                  ) : (
                    copy && (
                      <RichText
                        blocks={copy}
                        className={classNames(
                          'mb-ylg clear-both bold uppercase'
                        )}
                      />
                    )
                  )}
                </>
              )}
            </div>

            <div
              className={classNames(
                largeHeader ? '' : 'text-lg tracking-tight',
                'uppercase font-bold leading-[0.85]'
              )}
            >
              {currentStep !== 0 && (
                <>
                  {typeof copy === 'string' ? (
                    <p className="mb-yhalf text-lg font-bold uppercase tracking-tight leading-[0.85]">
                      {copy}
                    </p>
                  ) : (
                    copy && (
                      <RichText
                        blocks={copy}
                        className={classNames(
                          'mb-ylg clear-both bold uppercase'
                        )}
                      />
                    )
                  )}
                </>
              )}

              <div
                className={classNames(
                  block ? '' : 'md:min-h-[310px]',
                  currentStep !== 0 ? 'mt-ylg' : '',
                  'relative flex flex-col gap-3'
                )}
              >
                {children}
              </div>
            </div>
          </div>
        </div>

        <div
          className={classNames(
            block
              ? 'relative md:w-full bottom-0 md:bottom-auto'
              : 'absolute md:w-[calc(50%+4px)] md:ml-auto md:left-[calc(50%-2px)] bottom-[6rem] md:bottom-0',
            'flex w-full h-btn md:pr-menu'
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
            className="relative flex justify-between items-center w-full md:w-btnWidth px-x md:px-xhalf tracking-details h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
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
