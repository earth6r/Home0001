export const atFooter = (el: HTMLElement) => {
  const footer = document.getElementById('footer')
  return footer && el.getBoundingClientRect().bottom <= window.innerHeight
}
