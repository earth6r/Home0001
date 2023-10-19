import { animateScroll as scroll } from 'react-scroll'

export const scrollToEl = (el: HTMLElement) => {
  if (typeof window !== 'undefined') {
    const offset = window.innerWidth < 768 ? 16 : 40

    const top = el.getBoundingClientRect().top + window.scrollY - offset
    scroll.scrollTo(top)
  }
}

export default scrollToEl
