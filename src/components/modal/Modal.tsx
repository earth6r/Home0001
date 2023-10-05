import { IconX } from '@components/icons'
import { Dialog, Transition } from '@headlessui/react'
import React, { FC, Fragment, HTMLAttributes } from 'react'

interface ModalProps extends HTMLAttributes<HTMLElement> {
  isOpen?: boolean
  onClose?: () => void
}

const CloseButton: FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="z-50 fixed md:p-10 top-10 right-10">
      <button onClick={onClose}>
        <IconX className="w-[16px] md:w-[40px] h-[16px] md:h-[40px] stroke-2 md:stroke-1" />
      </button>
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
      onClose={() => onClose}
      className="fixed max-w-[600px] w-full top-ylg left-x z-header"
    >
      <div
        className="fixed inset-0 flex items-center justify-center bg-[#00000066] bg-opacity-75 z-0"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex w-full min-h-full items-center justify-center md:p-10">
        <Dialog.Panel className="block w-full h-full overflow-scroll bg-white z-modal">
          <div
            className="relative w-full h-full"
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClose={onClose} />
            {children}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  </Transition>
)

export default Modal
