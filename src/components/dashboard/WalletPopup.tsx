/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC } from 'react'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { Web3UserProps } from '@contexts/web3'

const WalletPopup: FC<{
  user: Web3UserProps
  setShowPopup: () => void
}> = ({ user, setShowPopup }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-above"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="rich-text aspect-square flex flex-col gap-ydouble relative w-full max-w-[358px] py-y p-x bg-white border-black"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onClick={e => e.stopPropagation()} // Prevent click from closing the popup
        >
          <p className="large !m-0">{`Your wallet is connected.`}</p>

          <p className="!m-0 !font-bold">
            WALLET ID:
            <br />
            {`${user?.address?.slice(0, 6)}...${user?.address?.slice(-6)}`}
          </p>

          <p className="!m-0">{`The next step is to begin your application to become a HOME0001 Member.`}</p>

          <div
            className={classNames(
              'absolute flex flex-col gap-2 md:gap-y w-[calc(100%-var(--space-x-double))] bottom-0'
            )}
          >
            <button
              onClick={setShowPopup}
              className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] mb-y bg-black text-white"
            >
              <IconSmallArrow fill="white" width="15" height="11" />
              <span className="uppercase font-medium leading-none text-xs">
                {`Continue`}
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default WalletPopup
