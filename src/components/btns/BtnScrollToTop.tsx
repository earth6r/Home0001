import classNames from 'classnames'
import { type FC, HTMLAttributes } from 'react'

export const BtnScrollToTop: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={classNames(className, 'border-bottom')}
    >
      {`Back to top ↑`}
    </button>
  )
}
