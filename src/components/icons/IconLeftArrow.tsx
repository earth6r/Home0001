import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconLeftArrowComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width={26} height={38} viewBox="0 0 26 38" {...props}>
      <path d="M15.5 18.4l7.6-7.6c1.2-1.2 1.8-2.8 1.8-4.5 0-1.7-.7-3.3-1.8-4.5C21.9.7 20.3 0 18.6 0c-1.7 0-3.3.7-4.4 1.9L6.6 9.5l-5 5.1c-.5.5-.9 1.1-1.2 1.8-.3.6-.4 1.3-.4 2s.1 1.4.4 2.1c.3.7.7 1.3 1.2 1.8l5 5.1L17.1 38l8.9-9-10.5-10.6z" />
    </svg>
  )
}

export const IconLeftArrow = memo(IconLeftArrowComponent)

export default IconLeftArrow
