import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconRightArrowComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width={26} height={38} viewBox="0 0 26 38" {...props}>
      <path
        d="M10.5 19.6L3 27.2c-1.2 1.2-1.8 2.8-1.8 4.5 0 1.7.7 3.3 1.8 4.5C4.1 37.3 5.7 38 7.4 38c1.7 0 3.3-.7 4.4-1.9l7.6-7.6 5-5.1c.5-.5.9-1.1 1.2-1.8.3-.7.4-1.4.4-2.1 0-.7-.1-1.4-.4-2.1-.3-.7-.7-1.3-1.2-1.8l-5-5.1L8.9 0 0 9l10.5 10.6z"
        fill="currentColor"
      />
    </svg>
  )
}

export const IconRightArrow = memo(IconRightArrowComponent)

export default IconRightArrow
