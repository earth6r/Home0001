import { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import type { Breakpoints } from '../lib/util'
import { getBreakpoints } from '../lib/util'

export const useBreakpoints = () => {
  const [breakpoints, setBreakpoints] = useState<Breakpoints | undefined>()
  useEffect(() => {
    const onResize = () => setBreakpoints(getBreakpoints(window.innerWidth))
    const debouncedResize = debounce(onResize, 150)
    window.addEventListener('resize', debouncedResize, { passive: true })
    onResize()
    return () => window.removeEventListener('resize', debouncedResize)
  }, [])
  return breakpoints
}
