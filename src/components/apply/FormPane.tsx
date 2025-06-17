/* eslint-disable no-console */
import React, { FC } from 'react'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import classNames from 'classnames'
import { PaneProps } from './types'

const FormPane: FC<PaneProps> = ({
  id,
  isSubmitting,
  onSubmit,
  className,
  children,
}) => {
  return (
    <form
      id={id}
      className={classNames(
        className,
        'flex flex-col gap-y justify-between min-h-[calc(80svh-var(--header-height)-var(--space-y-quad))] md:min-h-[calc(98svh-var(--header-height)-var(--space-y-quad))]'
      )}
      onSubmit={onSubmit}
    >
      {children}

      <button
        type={'submit'}
        form={id}
        disabled={isSubmitting}
        className={classNames(
          'relative flex justify-between items-center w-full px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above'
        )}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
        <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
      </button>
    </form>
  )
}

export default FormPane
