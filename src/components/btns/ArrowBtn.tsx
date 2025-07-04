import type { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import IconSmallArrow from '@components/icons/IconSmallArrow'

interface ArrowBtnProps extends HTMLAttributes<HTMLElement> {
  type?: 'button' | 'div' | 'submit'
  text?: string
  disabled?: boolean
  form?: string
  background?: 'black' | 'white'
}

export const ArrowBtn: FC<ArrowBtnProps> = ({
  type = 'button',
  background = 'black',
  text,
  form,
  className,
  ...props
}) => (
  <>
    {type !== 'div' ? (
      <button
        type={type}
        form={form}
        className={classNames(
          className,
          background === 'black'
            ? 'bg-black text-white'
            : 'bg-white border-black',
          'inline-flex justify-between items-center gap-[4.5px] w-fit relative px-[4px] pt-[4px] pb-[5px] font-medium text-left uppercase'
        )}
        {...props}
      >
        <IconSmallArrow
          className="relative w-[1.1em] mt-[0.05em]"
          fill={background === 'black' ? 'white' : 'black'}
        />
        <span className="leading-none">{text}</span>
      </button>
    ) : (
      <div
        className={classNames(
          className,
          background === 'black'
            ? 'bg-black text-white'
            : 'bg-white border-black',
          'inline-flex justify-between items-center gap-[4.5px] w-auto relative px-[6px] pt-[4px] pb-[5px] font-medium text-left uppercase'
        )}
        {...props}
      >
        <IconSmallArrow
          className="relative w-[1.1em] mt-[0.05em]"
          fill={background === 'black' ? 'white' : 'black'}
        />
        <span className="leading-none">{text}</span>
      </div>
    )}
  </>
)

export default ArrowBtn
