import type { FC } from 'react'
import { HTMLAttributes } from 'react'
import classNames from 'classnames'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { RichText } from '@components/sanity'
import IconSmallArrow from '@components/icons/IconSmallArrow'

interface PaneProps extends HTMLAttributes<HTMLElement> {
  header?: string
  copy?: RichTextType | string
  buttonCopy?: string
  buttonType?: 'button' | 'submit'
}

const Pane: FC<PaneProps> = ({
  header,
  copy,
  buttonCopy,
  buttonType,
  onClick,
  className,
  children,
}) => {
  return (
    <div
      className={classNames(
        className,
        'flex flex-wrap items-stretch relative h-full'
      )}
    >
      <div className="h-[calc(100%-var(--btn-height))]">
        {header && (
          <h2 className="pb-ylg uppercase">{header || `Join waitlist`}</h2>
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

        <div className="relative flex flex-col gap-4">{children}</div>
      </div>

      <div className={classNames('relative w-full h-btn bottom-0')}>
        <div className="absolute w-full h-[175%] modal-gradient left-0 bottom-0 z-base" />
        <button
          className="relative flex justify-between items-center w-full px-x md:px-xhalf tracking-normal h-btn text-center tracking-caps uppercase text-white bg-black z-above"
          type="button"
          onClick={onClick}
        >
          {buttonCopy || 'Submit'}
          <IconSmallArrow width="13" height="9" className="mr-[3px]" />
        </button>
      </div>
    </div>
  )
}

export default Pane
