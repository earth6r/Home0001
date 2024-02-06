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
    <div className="z-modal">
      <button
        onClick={onClose}
        className="uppercase font-medium"
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
          className="fixed inset-0 flex items-center justify-center cursor-pointer"
          onClick={onClose}
        ></div>

        <motion.div
          key="modal-panel"
          initial={{ transform: 'translate3d(100%, 0, 0)' }}
          animate={{ transform: 'translate3d(0, 0, 0)' }}
          exit={{ transform: 'translate3d(100%, 0, 0)' }}
          className="fixed inset-0 w-auto md:w-[390px] h-[100vh] top-0 right-0 md:ml-auto z-modal"
        >
          <div
            className={classNames(
              'absolute w-full md:w-[390px] h-full right-0 overflow-scroll bg-white'
            )}
          >
            <div className="relative w-full h-full" data-lenis-prevent>
              <div className="flex justify-between items-center sticky w-full h-[50px] md:h-[78px] top-0 px-x md:px-xhalf white-gradient z-modal">
                <span className="uppercase font-medium z-modal">{title}</span>
                <CloseButton onClose={onClose} />
              </div>
              {children}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

export default Modal
