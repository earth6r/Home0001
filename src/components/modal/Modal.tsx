import { Dialog, Transition } from '@headlessui/react'
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
    <div className="z-50 fixed right-0 px-x md:px-xhalf py-yhalf md:py-[24px]">
      <button
        onClick={onClose}
        className="uppercase font-medium mt-[0.5em]"
      >{`Close`}</button>
    </div>
  )
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <div
          className="fixed inset-0 flex items-center justify-center"
          onClick={onClose}
        ></div>

        <motion.div
          key="modal-panel"
          initial={{ right: 0 }}
          animate={{ right: 0 }}
          exit={{ right: 0 }}
          className="fixed inset-0 h-[100vh] top-0 right-0 z-modal"
        >
          <div
            className={classNames(
              'absolute w-full md:w-[390px] h-full right-0 overflow-scroll bg-white'
            )}
          >
            <div className="relative w-full h-full" data-lenis-prevent>
              <CloseButton onClose={onClose} />
              {children}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

export default Modal
