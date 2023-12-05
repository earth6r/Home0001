import type { FC, HTMLProps, Ref } from 'react'
import { useRef, useEffect, forwardRef } from 'react'
import classNames from 'classnames'
import { Menu } from '@headlessui/react'
import type { SanityLinkType } from '@studio/lib'
import { SanityLink } from '@components/sanity'
import { Btn } from '@components/btns'
import type { HeaderMenuProps } from './types'
import { Logo } from '@components/logos'

export const HeaderToggleBtn = forwardRef<typeof Btn>((props, ref) => (
  <Btn
    className="inline-block w-[66px] p-3 -m-3 leading-none z-header"
    innerRef={ref as Ref<HTMLButtonElement | HTMLAnchorElement>}
    custom={true}
    {...props}
  >
    {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
      // @ts-ignore  */}
    {props['aria-expanded'] ? (
      <span className="uppercase">Close</span>
    ) : (
      <span className="uppercase">Menu</span>
    )}
  </Btn>
))

export const HeaderMenu: FC<HeaderMenuProps & HTMLProps<HTMLDivElement>> = ({
  customOpen = false,
  onOpen,
  mainMenu,
  className,
}) => {
  const items = useRef<HTMLDivElement | null>(null)

  return (
    <div className={className}>
      <Menu>
        {({ open }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            if (onOpen) onOpen(open)
          }, [open])
          return (
            <>
              <Menu.Button as={HeaderToggleBtn} />
              <div
                className={classNames(
                  'fixed w-[100vw] h-[100vh] top-0 left-0 overflow-hidden bg-white text-left'
                )}
                style={{
                  transition: 'opacity var(--speed-fast)',
                  opacity: customOpen ? '1' : '0',
                  pointerEvents: customOpen ? 'all' : 'none',
                }}
              >
                <div className="flex items-center absolute h-header px-x">
                  <Logo />
                </div>
                <nav className="overflow-auto z-40 md:shadow-none pt-[88px] md:pt-[126px] left-0 w-full h-full fade-enter-done">
                  <Menu.Items
                    as="ul"
                    ref={items}
                    className="container flex flex-col gap-12 w-full outline-none"
                  >
                    {mainMenu?.items?.map(({ _key, text, link }) => {
                      return text && link ? (
                        <Menu.Item key={_key} as="li" className="uppercase">
                          {({ close }) => (
                            <SanityLink
                              text={text}
                              onClick={() => setTimeout(close, 100)}
                              {...(link as SanityLinkType)}
                            />
                          )}
                        </Menu.Item>
                      ) : null
                    })}
                  </Menu.Items>
                </nav>
              </div>
            </>
          )
        }}
      </Menu>
    </div>
  )
}

export default HeaderMenu
