import { AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import React, { FC, HTMLAttributes } from 'react'
import { motion } from 'framer-motion'

interface ModalProps extends HTMLAttributes<HTMLElement> {
  isOpen?: boolean
  onClose?: () => void
}

const CloseButton: FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="flex items-center h-full pointer-events-auto z-modal">
      <button
        onClick={onClose}
        className="uppercase font-medium py-y text-base"
      >{`Close`}</button>
    </div>
  )
}

export const Modal: FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  className,
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <div
          className="fixed inset-0 flex items-center justify-center cursor-pointer pointer-events-auto z-modal"
          onClick={onClose}
        ></div>

        <motion.div
          key="modal-panel"
          initial={{ transform: 'translate3d(100%, 0, 0)' }}
          animate={{ transform: 'translate3d(0, 0, 0)' }}
          exit={{ transform: 'translate3d(100%, 0, 0)' }}
          className="fixed inset-0 w-auto md:w-[390px] h-[100vh] top-0 right-0 md:ml-auto pointer-events-auto z-modal"
        >
          <div className="flex justify-between items-center fixed w-full h-header top-0 right-0 px-x z-modal">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="modal-background"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute w-full h-full bg-white z-behind"
                ></motion.div>
              )}
            </AnimatePresence>
            <span className="inline-block uppercase font-medium !font-sans tracking-normal !text-base z-modal">
              {title}
            </span>
            <CloseButton onClose={onClose} />
          </div>
          <div
            className={classNames(
              'absolute w-full md:w-[390px] h-full top-0 right-0 overflow-scroll bg-white'
            )}
          >
            <div className="relative w-full h-full" data-lenis-prevent>
              {children}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

export default Modal
