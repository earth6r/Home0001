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
  isSubmitting: boolean
  padding?: boolean
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
  isSubmitting,
  padding = true,
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
        'flex flex-wrap items-stretch md:items-start gap-y relative w-full h-full pb-ydouble'
      )}
    >
      <>
        <div
          className={classNames(
            block ? 'md:h-auto' : 'lg:h-full',
            'w-full h-[calc(100%-var(--btn-height)-[6rem])] overflow-visible'
          )}
        >
          {header && currentStep === 0 && (
            <h2 className={classNames('pb-y md:pb-ydouble text-h3')}>
              {header}
            </h2>
          )}

          <div
            className={classNames(
              block ? '' : 'lg:grid lg:grid-cols-2 gap-y h-auto',
              largeHeader ? '' : 'md:mt-y md:-mb-y pt-0',
              padding ? 'lg:w-full lg:pr-menu' : ''
            )}
          >
            <div>
              {header && currentStep !== 0 && (
                <h2
                  className={classNames(
                    'pb-y md:pb-ydouble text-h3 hidden md:block'
                  )}
                >
                  {header}
                </h2>
              )}

              {currentStep === 0 && (
                <>
                  {typeof copy === 'string' ? (
                    <p className="mb-yhalf text-h4">{copy}</p>
                  ) : (
                    copy && (
                      <RichText
                        blocks={copy}
                        className={classNames(
                          'md:w-btnWidth lg:w-full mb-ydouble clear-both bold'
                        )}
                      />
                    )
                  )}
                </>
              )}
            </div>

            <div className={classNames(largeHeader ? 'text-h4' : 'text-h3')}>
              {currentStep !== 0 && (
                <>
                  {typeof copy === 'string' ? (
                    <p className="mb-yhalf text-h3">{copy}</p>
                  ) : (
                    copy && (
                      <RichText
                        blocks={copy}
                        className={classNames(
                          'md:w-btnWidth lg:w-full mb-ydouble clear-both bold'
                        )}
                      />
                    )
                  )}
                </>
              )}

              <div
                className={classNames(
                  block ? '' : 'lg:min-h-[310px]',
                  currentStep !== 0 ? 'mt-ydouble' : '',
                  'relative flex flex-col gap-y'
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
              ? 'relative md:w-full bottom-0 xl:bottom-auto'
              : 'relative pb-20 lg:pb-0 lg:absolute lg:w-[calc(50%+4px)] lg:ml-auto lg:left-[calc(50%-75px)] lg:bottom-0',
            'flex w-full lg:w-[calc(50%-95px)] h-btn'
          )}
        >
          {currentStep && currentStep > 0 ? (
            <button
              className="relative flex justify-center items-center w-[48px] h-btn mr-2 bg-white border-black z-above"
              type={'button'}
              onClick={onBack}
            >
              <IconSmallArrow
                height="10"
                fill="black"
                className="transform rotate-180 w-[15px] md:w-[17px]"
              />
            </button>
          ) : null}

          <button
            className={classNames(
              padding ? 'md:w-btnWidth' : '',
              'relative flex justify-between items-center w-full px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above'
            )}
            type={buttonType || 'submit'}
            disabled={isSubmitting}
            onClick={onClick}
          >
            {isSubmitting ? 'Submitting...' : buttonCopy || 'Submit'}
            <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
          </button>
        </div>
      </>
    </Transition>
  )
}

export default Pane
