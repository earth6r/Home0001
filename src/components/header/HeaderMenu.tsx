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
                  customOpen
                    ? 'opacity-100 pointer-events-all'
                    : 'opacity-0 pointer-events-none',
                  'fixed w-[100vw] h-[100vh] top-0 right-0 overflow-hidden bg-white text-left transition-opacity'
                )}
              >
                <div
                  className={classNames(
                    open ? 'pointer-events-auto' : '',
                    'flex items-center absolute h-header px-x pointer-events-none'
                  )}
                >
                  <Logo className="md:hidden" />
                  <span className="hidden md:block text-base uppercase">
                    Menu
                  </span>
                </div>
                <nav
                  className={classNames(
                    open ? 'pointer-events-auto' : '',
                    'md:grid md:grid-cols-2 overflow-auto z-40 md:shadow-none pt-[78px] md:pt-[132px] left-0 w-full h-full text-base fade-enter-done'
                  )}
                >
                  <Menu.Items
                    as="ul"
                    ref={items}
                    className="container flex flex-col w-full outline-none pb-ydouble"
                  >
                    <li className="md:hidden uppercase mb-y">
                      <span className="inline-block">Homes:</span>
                    </li>
                    {mainMenu?.items?.map(({ _key, text, link }, index) => {
                      const isUnit =
                        (link?.internalLink?._type as string) === 'unit'
                      const isProperty =
                        (link?.internalLink?._type as string) === 'property'
                      return text && link ? (
                        <Fragment key={_key}>
                          {mainMenu.items &&
                            index === mainMenu.items.length && (
                              <Menu.Item as="li">
                                {({ close }) => (
                                  <button
                                    onClick={() => {
                                      setTimeout(close, 100)
                                      setBrokerInquiryOpen(true)
                                    }}
                                    className="uppercase mb-ydouble hover:underline underline-offset-2 decoration-[2px]"
                                  >
                                    Are you a realtor?
                                  </button>
                                )}
                              </Menu.Item>
                            )}
                          <Menu.Item
                            as="li"
                            className={classNames('uppercase')}
                          >
                            {({ close }) => (
                              <SanityLink
                                text={text}
                                onClick={() => {
                                  setTimeout(close, 100)
                                  setHeaderLinksShown(true)
                                }}
                                {...(link as SanityLinkType)}
                                className={classNames(
                                  isUnit ? 'pl-xdouble' : '',
                                  isProperty || isUnit
                                    ? 'mb-y md:hidden'
                                    : 'py-y md:pt-0 md:pb-ydouble',
                                  'inline-block hover:underline underline-offset-2 decoration-[2px]'
                                )}
                              />
                            )}
                          </Menu.Item>
                        </Fragment>
                      ) : null
                    })}

                    <li className="flex items-center gap-y uppercase pt-y">
                      <span className="inline-block">Prices:</span>

                      <span className="inline-block">Fiat</span>
                      <Switch
                        checked={cryptoMode}
                        onChange={setCryptoMode}
                        className={classNames(
                          cryptoMode ? 'bg-black' : 'bg-gray',
                          `relative inline-flex h-6 w-11 items-center rounded-full pointer-events-auto -mx-[10px]`
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

                  <Menu.Items
                    as="ul"
                    ref={items}
                    className="hidden md:flex flex-col w-full outline-none pb-ydouble"
                  >
                    <li className="uppercase">
                      <span className="inline-block">Homes:</span>
                    </li>
                    {mainMenu?.items?.map(({ _key, text, link }, index) => {
                      const isUnit =
                        (link?.internalLink?._type as string) === 'unit'
                      const isProperty =
                        (link?.internalLink?._type as string) === 'property'
                      return text && link && (isUnit || isProperty) ? (
                        <Fragment key={_key}>
                          <Menu.Item as="li" className="uppercase">
                            {({ close }) => (
                              <SanityLink
                                text={text}
                                onClick={() => {
                                  setTimeout(close, 100)
                                  setHeaderLinksShown(true)
                                }}
                                {...(link as SanityLinkType)}
                                className={classNames(
                                  isUnit ? 'mb-y pl-xdouble' : '',
                                  isProperty ? 'pt-y' : '',
                                  'inline-block mb-y hover:underline underline-offset-2 decoration-[2px]'
                                )}
                              />
                            )}
                          </Menu.Item>
                        </Fragment>
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
