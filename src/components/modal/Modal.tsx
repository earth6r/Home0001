import { IconX } from '@components/icons'
import { Dialog, Transition } from '@headlessui/react'
import React, { FC, Fragment, HTMLAttributes } from 'react'

interface ModalProps extends HTMLAttributes<HTMLElement> {
  isOpen?: boolean
  onClose?: () => void
}

const CloseButton: FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="z-50 fixed top-[calc(var(--header-height)+var(--space-y)+3px)] right-xdouble md:p-10 md:top-10 md:right-10">
      <button onClick={onClose}>
        <IconX className="w-[16px] md:w-[34px] h-[16px] md:h-[34px] stroke-2 md:stroke-1" />
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
      className="fixed max-w-[600px] w-full z-header"
    >
      <div
        className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-base"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex min-h-full items-center justify-center px-x pt-header pb-y md:p-10 z-base pointer-events-none">
        <Dialog.Panel className="block w-full h-full overflow-scroll bg-white border-black z-modal">
          <div
            className="relative w-full h-full pointer-events-auto"
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
