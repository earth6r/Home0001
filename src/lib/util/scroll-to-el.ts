import { animateScroll as scroll } from 'react-scroll'

export const scrollToEl = (el: HTMLElement) => {
  if (typeof window !== 'undefined') {
    const top = el.getBoundingClientRect().top + window.scrollY
    scroll.scrollTo(top)
  }
}

export default scrollToEl
