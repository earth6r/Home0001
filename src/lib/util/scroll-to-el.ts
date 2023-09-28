import { animateScroll as scroll } from 'react-scroll'

export const scrollToEl = (el: any) => {
  if (typeof window !== 'undefined' && el) {
    const top = el.getBoundingClientRect().top
    scroll.scrollTo(top)
  }
}

export default scrollToEl
