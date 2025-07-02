/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC } from 'react'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowBtn } from '@components/btns'

const DashboardPopup: FC<{ setShowPopup: (arg0: boolean) => void }> = ({
  setShowPopup,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="rich-text aspect-square flex flex-col gap-y relative w-full max-w-[358px] py-y p-x bg-white border-black"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onClick={e => e.stopPropagation()} // Prevent click from closing the popup
        >
          <p className="large !mx-0 mb-y">
            {`Thanks, your application has been submitted.`}
          </p>
          <p className="!m-0">Welcome to your dashboard.</p>
          <p className="!m-0">
            You can manage your account and application here.
          </p>
          <p className="!m-0">
            The next step is for you to reach out to a member of the collective.
          </p>

          <div
            className={classNames(
              'absolute flex flex-col gap-2 md:gap-y w-[calc(100%-var(--space-x-double))] bottom-0'
            )}
          >
            <ArrowBtn
              onClick={() => setShowPopup(false)}
              text={`Continue`}
              className="mb-y"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DashboardPopup
