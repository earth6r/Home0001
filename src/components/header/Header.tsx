import type { FC } from 'react'
import { useCallback, useRef, useState } from 'react'
import classNames from 'classnames'
import type { HeaderProps } from './types'
import { Logo } from '@components/logos'
import HeaderMenu from './HeaderMenu'
import type { Menus as SanityMenu } from '@gen/sanity-schema'
import { Btn } from '@components/btns'
import IconSmallArrow from '@components/icons/IconSmallArrow'

export const Header: FC<HeaderProps> = ({ className, mainMenu }) => {
  const onOpen = useCallback((open: boolean) => setMenuOpen(open), [])
  const [menuOpen, setMenuOpen] = useState(false)
  const el = useRef<HTMLElement>(null)

  return (
    <div
      id="header"
      className={classNames(
        className,
        'fixed w-full pointer-events-none z-header'
      )}
    >
      <header
        ref={el}
        role="banner"
        className="flex justify-between items-center relative w-full h-header px-x"
      >
        <Logo className="flex items-center h-header pointer-events-auto" />
        <div className="flex items-center gap-5 md:gap-16">
          <Btn
            type="button"
            className="flex p-[5px] md:p-[6px] bg-black text-white leading-none uppercase z-header"
          >
            <IconSmallArrow width="13" height="9" className="mr-[3px]" />
            {`Waitlist`}
          </Btn>
          <HeaderMenu
            customOpen={menuOpen}
            onOpen={onOpen}
            mainMenu={mainMenu as SanityMenu}
            className="flex flex-col pointer-events-auto"
          />
        </div>
      </header>
    </div>
  )
}

export default Header
