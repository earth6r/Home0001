import React, { FC } from 'react'
import classNames from 'classnames'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import Link from 'next/link'
import WalletButton from './WalletButton'
import { isMobile, isIOS, isAndroid, browserName } from 'react-device-detect'

const ApplicationPrompt: FC<{ header?: string; className?: string }> = ({
  header,
  className,
}) => (
  <div className={classNames(className, 'inline-flex flex-col gap-y')}>
    {`BROWSER NAME: ${browserName}`}
    <br />
    {`IS MOBILE: ${isMobile}`}
    <br />
    {`IS IOS: ${isIOS}`}
    <br />
    {`IS ANDROID: ${isAndroid}`}
    <br />
    {`BROWSER NAME (UA): ${navigator.userAgent}`}

    {(!isMobile || browserName === 'metamask') && (
      <>
        <div className="md:max-w-[50%] rich-text mb-y">
          <h3 className="text-left mb-ydouble">{header}</h3>
          <p>To connect your wallet:</p>
        </div>

        <WalletButton className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] bg-white border-black">
          <IconSmallArrow fill="black" width="15" height="11" />
          <span className="uppercase font-medium leading-none text-xs">
            {`Connect your wallet`}
          </span>
        </WalletButton>
      </>
    )}

    <div className="rich-text my-y">
      <span className="text-left">
        {!isMobile || browserName === 'metamask'
          ? `Or if you don’t have one already`
          : `Mobile users please visit our site inside of the metamask mobile app:`}
      </span>
    </div>

    <Link
      href={`https://metamask.io/download/`}
      target="_blank"
      className="font-bold"
    >
      <button className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] bg-white border-black">
        <IconSmallArrow fill="black" width="15" height="11" />

        <span className="uppercase font-medium leading-none text-xs">
          {isMobile ? `Get Metamask` : `Create a wallet`}
        </span>
      </button>
    </Link>
  </div>
)

export default ApplicationPrompt
