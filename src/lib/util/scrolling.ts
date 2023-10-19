import { animateScroll as scroll } from 'react-scroll'

export const scrollToEl = (el: HTMLElement, tile?: boolean) => {
  if (typeof window !== 'undefined') {
    const offset = window.innerWidth < 768 ? 46 : tile ? -5 : -46

    const top = el.getBoundingClientRect().top + window.scrollY - offset
    scroll.scrollTo(top)
  }
}
