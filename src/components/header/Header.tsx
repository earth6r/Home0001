import type { FC } from 'react'
import { useCallback, useRef, useState } from 'react'
import classNames from 'classnames'
import type { HeaderProps } from './types'
import { Logo } from '@components/logos'
import HeaderMenu from './HeaderMenu'
import type { Menus as SanityMenu } from '@gen/sanity-schema'
// import styles from './header.module.css'

export const Header: FC<HeaderProps> = ({ className, mainMenu }) => {
  const onOpen = useCallback((open: boolean) => setMenuOpen(open), [])
  const [menuOpen, setMenuOpen] = useState(false)
  const el = useRef<HTMLElement>(null)

  return (
    <div id="header" className={classNames(className, 'fixed w-full z-header')}>
      <header
        ref={el}
        role="banner"
        className="flex justify-between items-center w-full px-x pt-y"
      >
        <Logo />
        <HeaderMenu
          customOpen={menuOpen}
          onOpen={onOpen}
          mainMenu={mainMenu as SanityMenu}
          className="flex flex-col"
        />
      </header>
    </div>
  )
}

export default Header
