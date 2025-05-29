import React, { FC } from 'react'
import classNames from 'classnames'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import Link from 'next/link'
import WalletButton from './WalletButton'

const ApplicationPrompt: FC<{ className?: string }> = ({ className }) => (
  <div
    className={classNames(
      className,
      'inline-flex flex-col gap-y py-ydouble bg-yellow'
    )}
  >
    <div className="md:max-w-[50%] rich-text mb-y">
      <h3 className="text-left">To join:</h3>
      <p>
        We need you to connect your wallet so we can issue you with a soulbound
        token if your application is successful.
      </p>
    </div>

    <WalletButton className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] bg-white border-black">
      <IconSmallArrow fill="black" width="15" height="11" />
      <span className="uppercase font-medium leading-none text-xs">
        {`Connect your wallet`}
      </span>
    </WalletButton>

    <div className="rich-text my-y">
      <span className="text-left">Or if you don’t have one already:</span>
    </div>

    <Link
      href={`https://metamask.io/download/`}
      target="_blank"
      className="font-bold"
    >
      <button className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] bg-white border-black">
        <IconSmallArrow fill="black" width="15" height="11" />

        <span className="uppercase font-medium leading-none text-xs">
          {`Create a wallet`}
        </span>
      </button>
    </Link>
  </div>
)

export default ApplicationPrompt
