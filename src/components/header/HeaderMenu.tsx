import type { Dispatch, FC, HTMLProps, SetStateAction } from 'react'
import { useRef, Fragment, useState } from 'react'
import classNames from 'classnames'
import { Switch } from '@headlessui/react'
import type { SanityLinkType } from '@studio/lib'
import { SanityLink } from '@components/sanity'
import { Btn } from '@components/btns'
import type { HeaderMenuProps } from './types'
import { Logo } from '@components/logos'
import { useCryptoMode, useHeaderLinks } from '@contexts/header'
import { useBrokerInquiryModal } from '@contexts/modals'
import { useLenis } from '@studio-freight/react-lenis'
import IconChevron from '@components/icons/IconChevron'
import { AnimatePresence, motion } from 'framer-motion'
import { useWalletUser, Web3UserProps } from '@contexts/web3'
import IconSmallArrow from '@components/icons/IconSmallArrow'

export const HeaderMenu: FC<HeaderMenuProps & HTMLProps<HTMLDivElement>> = ({
  customOpen = false,
  hidePageLinks,
  setCustomOpen,
  onOpen,
  mainMenu,
  className,
}) => {
  const [user, updateUser] = useWalletUser() as [
    Web3UserProps,
    Dispatch<SetStateAction<Web3UserProps>>
  ]

  const lenis = useLenis()

  const [headerLinksShown, setHeaderLinksShown] = useHeaderLinks()
  const [cryptoMode, setCryptoMode] = useCryptoMode()
  const [brokerInquiryOpen, setBrokerInquiryOpen] = useBrokerInquiryModal()
  const [locationsOpen, setLocationsOpen] = useState(false)

  return (
    <div className={className}>
      <Btn
        className="inline-block w-[66px] p-3 -m-3 leading-none z-header"
        onClick={() => {
          lenis.start()
          setCustomOpen(!customOpen)
        }}
        custom={true}
      >
        {customOpen ? (
          <span className="inline-block relative uppercase right-[6.5px]">
            Close
          </span>
        ) : (
          <span className="uppercase">Menu</span>
        )}
      </Btn>

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
            customOpen ? 'pointer-events-auto' : '',
            'flex items-center absolute h-header px-x pointer-events-none'
          )}
        >
          <Logo className="hidden" />
          <span className="block text-base uppercase">Menu</span>
        </div>
        <nav
          className={classNames(
            customOpen ? 'pointer-events-auto' : '',
            'grid md:grid-cols-2 lg:grid-cols-3 overflow-auto pt-header left-0 w-full h-full text-base fade-enter-done z-above'
          )}
        >
          <ul className="container flex flex-col gap-ydouble w-full outline-none pb-[192px]">
            <li className="w-full">
              <button
                onClick={() => setLocationsOpen(!locationsOpen)}
                className="flex w-full justify-between items-center uppercase"
              >
                <span className="inline-block">Locations</span>
                <IconChevron
                  width="12"
                  className={classNames(
                    locationsOpen ? 'rotate-[180deg]' : 'rotate-0',
                    'transform transition-transform duration-300'
                  )}
                />
              </button>

              <AnimatePresence>
                {locationsOpen && (
                  <motion.div
                    initial={{ maxHeight: 0 }}
                    animate={{ maxHeight: 500 }}
                    exit={{ maxHeight: 0 }}
                    className="flex flex-col gap-ydouble pt-ydouble ml-xdouble overflow-hidden"
                  >
                    {mainMenu?.items?.map(({ _key, text, link }) => {
                      const isProperty =
                        (link?.internalLink?._type as string) === 'property'
                      return text && link && isProperty ? (
                        <Fragment key={_key}>
                          <div>
                            <SanityLink
                              text={text}
                              onClick={() => {
                                setTimeout(() => setCustomOpen(false), 100)
                                setHeaderLinksShown(true)
                              }}
                              {...(link as SanityLinkType)}
                              className={classNames(
                                'inline-block hover:underline underline-offset-2 decoration-[2px] uppercase text-left'
                              )}
                            />
                          </div>
                        </Fragment>
                      ) : null
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {mainMenu?.items?.map(({ _key, text, link }, index) => {
              const isPropertyType =
                (link?.internalLink?._type as string) === 'propertyType'
              const isProperty =
                (link?.internalLink?._type as string) === 'property'

              if (hidePageLinks && text !== 'About' && text !== 'Instagram')
                return null

              return text && link && !isProperty && !isPropertyType ? (
                <Fragment key={_key}>
                  {mainMenu.items && index === mainMenu.items.length && (
                    <li>
                      <button
                        onClick={() => {
                          setTimeout(() => setCustomOpen(false), 100)
                          setBrokerInquiryOpen(true)
                        }}
                        className="uppercase"
                      >
                        Are you a realtor?
                      </button>
                    </li>
                  )}
                  <li>
                    <SanityLink
                      text={text}
                      onClick={() => {
                        setTimeout(() => setCustomOpen(false), 100)
                        setHeaderLinksShown(true)
                      }}
                      {...(link as SanityLinkType)}
                      className={classNames(
                        'inline-block hover:underline underline-offset-2 decoration-[2px] uppercase'
                      )}
                    />
                  </li>
                </Fragment>
              ) : null
            })}

            {!hidePageLinks && (
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
            )}

            {user?.address && (
              <>
                <li className="max-w-48 !break-all">
                  Wallet ID: {user.address}
                </li>
                <li>
                  <button
                    onClick={() => {
                      updateUser(null)
                      localStorage.setItem('walletAddress', '')
                      setHeaderLinksShown(true)
                      setTimeout(() => setCustomOpen(false), 100)
                    }}
                    className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] bg-white border-black"
                  >
                    <IconSmallArrow fill="black" width="15" height="11" />

                    <span className="uppercase font-medium !leading-none">
                      {`Disconnect Wallet`}
                    </span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default HeaderMenu
