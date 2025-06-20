import React, { FC } from 'react'
import classNames from 'classnames'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import Link from 'next/link'
import WalletButton from './WalletButton'
import { isMobile, isIOS, isAndroid, browserName } from 'react-device-detect'

const ApplicationPrompt: FC<{ header?: string; className?: string }> = ({
  header,
  className,
}) => {
  const isMetamask = navigator.userAgent.includes('MetaMaskMobile')

  return (
    <div className={classNames(className, 'inline-flex flex-col gap-y')}>
      <h3 className="test-h3 text-left mb-y">{header}</h3>
      {(!isMobile || isMetamask) && (
        <>
          <div className="md:max-w-[50%] rich-text mb-y">
            <p>To connect your wallet:</p>
          </div>

          <WalletButton className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] mb-y bg-white border-black">
            <IconSmallArrow fill="black" width="15" height="11" />
            <span className="uppercase font-medium leading-none text-xs">
              {`Connect your wallet`}
            </span>
          </WalletButton>
        </>
      )}

      {!isMetamask && (
        <>
          <div className="rich-text mb-y">
            <span className="text-left">
              {!isMobile
                ? `Or if you don’t have one already`
                : `Mobile users please visit our site inside of the MetaMask mobile app:`}
            </span>
          </div>

          <Link
            href={
              isIOS
                ? `https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202?pt=119300752`
                : isAndroid
                ? `https://play.google.com/store/apps/details?id=io.metamask`
                : `https://metamask.io/download/`
            }
            target="_blank"
            className="font-bold"
          >
            <button className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] bg-white border-black">
              <IconSmallArrow fill="black" width="15" height="11" />

              <span className="uppercase font-medium leading-none text-xs">
                {isMobile ? `Get MetaMask` : `Create a wallet`}
              </span>
            </button>
          </Link>
        </>
      )}
    </div>
  )
}

export default ApplicationPrompt
