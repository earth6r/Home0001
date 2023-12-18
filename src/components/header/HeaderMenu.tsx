import type { FC, HTMLProps, Ref } from 'react'
import { useRef, useEffect, forwardRef, Fragment } from 'react'
import classNames from 'classnames'
import { Menu, Switch } from '@headlessui/react'
import type { SanityLinkType } from '@studio/lib'
import { SanityLink } from '@components/sanity'
import { Btn } from '@components/btns'
import type { HeaderMenuProps } from './types'
import { Logo } from '@components/logos'
import { useCryptoMode, useHeaderLinks } from '@contexts/header'
import { useBrokerInquiryModal } from '@contexts/modals'

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
      <span className="inline-block relative uppercase right-[6.5px]">
        Close
      </span>
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
  const [headerLinksShown, setHeaderLinksShown] = useHeaderLinks()
  const [cryptoMode, setCryptoMode] = useCryptoMode()
  const [brokerInquiryOpen, setBrokerInquiryOpen] = useBrokerInquiryModal()

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
                  'fixed w-[100vw] h-[100vh] top-0 left-0 overflow-hidden bg-white text-left pointer-events-none'
                )}
                style={{
                  transition: 'opacity var(--speed-fast)',
                  opacity: customOpen ? '1' : '0',
                  pointerEvents: customOpen ? 'all' : 'none',
                }}
              >
                <div
                  className={classNames(
                    open ? 'pointer-events-auto' : '',
                    'flex items-center absolute h-header px-x pointer-events-auto'
                  )}
                >
                  <Logo />
                </div>
                <nav
                  className={classNames(
                    open ? 'pointer-events-auto' : '',
                    'overflow-auto z-40 md:shadow-none pt-[88px] md:pt-[126px] left-0 w-full h-full fade-enter-done'
                  )}
                >
                  <Menu.Items
                    as="ul"
                    ref={items}
                    className="container flex flex-col gap-12 w-full outline-none"
                  >
                    {mainMenu?.items?.map(({ _key, text, link }, index) => {
                      return text && link ? (
                        <Fragment key={_key}>
                          {mainMenu.items &&
                            index === mainMenu.items.length - 1 && (
                              <Menu.Item as="li">
                                {({ close }) => (
                                  <button
                                    onClick={() => {
                                      setTimeout(close, 100)
                                      setBrokerInquiryOpen(true)
                                    }}
                                  >
                                    ARE YOU A BROKER?
                                  </button>
                                )}
                              </Menu.Item>
                            )}
                          <Menu.Item as="li" className="uppercase">
                            {({ close }) => (
                              <SanityLink
                                text={text}
                                onClick={() => {
                                  setTimeout(close, 100)
                                  setHeaderLinksShown(true)
                                }}
                                {...(link as SanityLinkType)}
                              />
                            )}
                          </Menu.Item>
                        </Fragment>
                      ) : null
                    })}

                    <li className="flex items-center gap-4 uppercase">
                      <span className="inline-block">Fiat</span>
                      <Switch
                        checked={cryptoMode}
                        onChange={setCryptoMode}
                        className={classNames(
                          cryptoMode ? 'bg-yellow' : 'bg-gray',
                          `relative inline-flex h-6 w-11 items-center rounded-full pointer-events-auto`
                        )}
                      >
                        {' '}
                        <span
                          className={classNames(
                            cryptoMode ? 'translate-x-6' : 'translate-x-1',
                            `block h-4 w-4 transform rounded-full bg-white transition`
                          )}
                        />
                      </Switch>
                      <span className="inline-block">Crypto</span>
                    </li>
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
