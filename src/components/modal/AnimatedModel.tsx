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
        className="absolute uppercase font-medium right-0 px-x py-y md:p-y"
      >{`Close`}</button>
    </div>
  )
}

export const AnimatedModal: FC<AnimatedModalProps> = ({
  isOpen,
  onClose,
  children,
}) => (
  <AnimatePresence mode="wait">
    {isOpen && (
      <>
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 flex items-center justify-center h-[100vh] md:h-auto bg-gray md:bg-transparent md:backdrop-blur-sm pointer-events-auto z-base"
          onClick={onClose}
        ></motion.div>

        <motion.div
          key="panel"
          initial={{ top: '-100%' }}
          animate={{ top: 0 }}
          exit={{ top: '-100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 flex h-[100vh] items-center md:items-start justify-center z-modal pointer-events-none"
        >
          <div className="block w-full h-[100vh] md:h-[726px] bg-gray z-modal">
            <div
              className="relative w-full h-full pointer-events-auto"
              onClick={e => e.stopPropagation()}
            >
              <CloseButton onClose={onClose} />
              {children}
            </div>
            <div className="md:hidden absolute w-full h-[40px] left-0 bottom-y bg-gradient-to-t from-[#EDEDED] to-transparent z-above"></div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

export default AnimatedModal
