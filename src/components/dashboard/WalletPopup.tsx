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
        onClick={setShowPopup}
      >
        <motion.div
          className="rich-text flex flex-col gap-ydouble relative w-full max-w-[358px] py-y p-x bg-white border-black"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onClick={e => e.stopPropagation()} // Prevent click from closing the popup
        >
          <p className="large !mx-0">{`Your wallet is connected.`}</p>

          <p className="!mx-0">
            TOKEN ID: <br />
            {`${user?.address?.slice(0, 6)}...${user?.address?.slice(-6)}`}
          </p>

          <p className="!mx-0">{`The next step is to begin your application to become a HOME0001 Member.`}</p>

          <div className={classNames('relative flex flex-col gap-2 md:gap-y')}>
            <button
              className="relative flex justify-between items-center w-full max-w-full px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
              onClick={setShowPopup}
            >
              {'Continue'}
              <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default WalletPopup
