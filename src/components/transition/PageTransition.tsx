import React, { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

type PageTransitionProps = HTMLMotionProps<'div'>
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>

function PageTransition(
  { children }: PageTransitionProps,
  ref: PageTransitionRef
) {
  const hide = { opacity: 0 }
  const show = { opacity: 1 }

  const transition = {
    duration: 0.5,
    ease: 'easeInOut',
  }

  return (
    <motion.div
      ref={ref}
      initial={hide}
      animate={show}
      exit={hide}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

export default forwardRef(PageTransition)
