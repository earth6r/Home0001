import type { FC } from 'react'
import { useRef } from 'react'
import classNames from 'classnames'
import type { HeaderProps } from './types'
import styles from './header.module.css'

export const Header: FC<HeaderProps> = ({ className }) => {
  const el = useRef<HTMLElement>(null)
  return (
    <div id="header" className={classNames(className, 'sticky z-header')}>
      <header
        ref={el}
        role="banner"
        className={classNames(styles.header, 'bg-black h-80px')}
      ></header>
    </div>
  )
}

export default Header
