import type { FC, HTMLAttributes } from 'react'
import type { BtnCSSProperties } from '@components/btns'

interface SwiperNavigationProps extends HTMLAttributes<HTMLElement> {
  arrowClass?: string
  arrowStyle?: BtnCSSProperties
}

export const SwiperNavigation: FC<SwiperNavigationProps> = ({ ...props }) => {
  return (
    <nav
      className="block-content w-full h-full top-0 left-0 absolute z-2 pointer-events-none"
      {...props}
    >
      <span>left</span>
      <span>right</span>
    </nav>
  )
}

export default SwiperNavigation
