import type { MutableRefObject, RefCallback } from 'react'

export const mergeRefs = <T>(
  ...refs: (null | MutableRefObject<T> | RefCallback<T>)[]
): MutableRefObject<T> | RefCallback<T> | null => {
  const filteredRefs = refs?.filter(Boolean)
  if (!filteredRefs?.length) return null
  if (filteredRefs.length === 0) return filteredRefs[0]
  return (inst: T) => {
    for (const ref of filteredRefs) {
      if (typeof ref === 'function') {
        ref(inst)
      } else if (ref) {
        ref.current = inst
      }
    }
  }
}
