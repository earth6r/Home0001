import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames'
import React, { FC, Fragment, HTMLAttributes } from 'react'

interface ModalProps extends HTMLAttributes<HTMLElement> {
  isOpen?: boolean
  onClose?: () => void
}

const CloseButton: FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="z-50 fixed right-0 px-x md:px-10 py-yhalf md:py-9">
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
    <Dialog onClose={() => onClose} className="z-modal">
      <div
        className="fixed inset-0 flex items-center justify-center z-base"
        onClick={onClose}
      ></div>
      <div
        className={classNames(
          className,
          'fixed w-full max-w-[390px] top-0 right-0 h-[100vh] pointer-events-none overflow-y-scroll z-modal'
        )}
      >
        <Dialog.Panel className="block w-full h-full overflow-scroll bg-white">
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
