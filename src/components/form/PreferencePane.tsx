import type { FC } from 'react'
import { HTMLAttributes } from 'react'
import classNames from 'classnames'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { RichText } from '@components/sanity'
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

const PreferencePane: FC<PaneProps> = ({
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
        'flex flex-wrap items-stretch h-auto md:items-start relative w-full'
      )}
    >
      <div className="flex flex-col w-full overflow-auto">
        <div className="order-0">
          {header && (
            <h2
              className={classNames(
                block ? 'md:pr-menu' : '',
                largeHeader ? 'text-h2' : 'md:mt-y text-h3 pt-ydouble md:pt-0',
                'pb-y md:pb-ydouble'
              )}
            >
              {header || `Update Preferences:`}
            </h2>
          )}
        </div>
        <div
          className={classNames(
            block ? '' : 'md:grid md:grid-cols-2 md:gap-20',
            'md:w-full md:pr-menu order-1'
          )}
        >
          {typeof copy === 'string' ? (
            <p className="mb-ydouble text-md font-medium">{copy}</p>
          ) : (
            copy && (
              <RichText
                blocks={copy}
                className={classNames('mb-ydouble clear-both')}
              />
            )
          )}

          <div
            className={classNames(
              block ? '' : 'md:min-h-[328px]',
              'relative flex flex-col gap-y pb-y'
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default PreferencePane
