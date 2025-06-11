/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC } from 'react'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import IconSmallArrow from '@components/icons/IconSmallArrow'

const DashboardPopup: FC<{ setShowPopup: (arg0: boolean) => void }> = ({
  setShowPopup,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-above"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowPopup(false)}
      >
        <motion.div
          className="relative w-full max-w-[358px] p-x bg-white border-black"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onClick={e => e.stopPropagation()} // Prevent click from closing the popup
        >
          <h2 className="mb-ydouble mt-[42px] text-h3">
            {`Thank you, we've received your submission.`}
          </h2>
          <h3 className="text-h3">{`Welcome to the home0001 dashboard.`}</h3>

          <div
            className={classNames(
              'relative flex flex-col mt-ydouble gap-2 md:gap-y'
            )}
          >
            <button
              className="relative flex justify-between items-center w-full max-w-full px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
              type={'submit'}
            >
              {'Continue'}
              <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
            </button>
          </div>

          <button
            className="absolute top-x right-x text-black uppercase font-medium text-sm"
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DashboardPopup
