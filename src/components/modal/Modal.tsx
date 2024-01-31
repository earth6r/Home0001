import { Dialog, Transition } from '@headlessui/react'
import React, { FC, Fragment, HTMLAttributes } from 'react'

interface ModalProps extends HTMLAttributes<HTMLElement> {
  isOpen?: boolean
  onClose?: () => void
}

const CloseButton: FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="z-50 fixed top-ydouble right-xdouble md:p-10 md:top-y md:right-16">
      <button
        onClick={onClose}
        className="uppercase font-medium mt-[0.5em]"
      >{`Close`}</button>
    </div>
  )
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => (
  <Transition
    show={isOpen}
    enter="transition-opacity duration-250 ease-in-out"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-250 ease-in-out"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
    as={Fragment}
  >
    <Dialog
      as="div"
      onClose={() => onClose}
      className="fixed inset-0 flex justify-center w-[100vw] h-[100vh] top-0 left-0 z-modal"
    >
      <div
        className="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="absolute flex w-[90%] h-[90%] top-y justify-center">
        <Dialog.Overlay className="block relative w-full h-full">
          <div
            className="relative w-full h-full bg-white overflow-scroll border-black"
            data-lenis-prevent
          >
            <CloseButton onClose={onClose} />
            {children}
          </div>
        </Dialog.Overlay>
      </div>
    </Dialog>
  </Transition>
)

export default Modal
