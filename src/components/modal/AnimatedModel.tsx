import { AnimatePresence } from 'framer-motion'
import React, { FC, HTMLAttributes } from 'react'
import { motion } from 'framer-motion'

interface AnimatedModalProps extends HTMLAttributes<HTMLElement> {
  isOpen?: boolean
  onClose?: () => void
}

const CloseButton: FC<AnimatedModalProps> = ({ onClose }) => {
  return (
    <div className="z-modal">
      <button
        onClick={onClose}
        className="absolute uppercase font-medium right-0 px-x py-y md:p-5"
      >{`Close`}</button>
    </div>
  )
}

export const AnimatedModal: FC<AnimatedModalProps> = ({
  isOpen,
  onClose,
  children,
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 flex items-center justify-center h-[100vh] md:h-auto bg-yellow md:bg-transparent md:backdrop-blur-sm pointer-events-auto z-base"
          onClick={onClose}
        ></motion.div>

        <motion.div
          key="panel"
          initial={{ top: '-100%' }}
          animate={{ top: 0 }}
          exit={{ top: '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 flex h-[100vh] items-center md:items-start justify-center z-modal pointer-events-none"
        >
          <div className="block w-full h-full md:h-[630px] overflow-scroll bg-yellow z-modal">
            <div
              className="relative w-full h-full pointer-events-auto"
              onClick={e => e.stopPropagation()}
            >
              <CloseButton onClose={onClose} />
              {children}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

export default AnimatedModal
