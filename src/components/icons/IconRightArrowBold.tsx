import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconRightArrowBoldComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 43 26"
      {...props}
    >
      <path
        fill="#000"
        d="M0 14.625h36.5l-8.755 9.084L29.97 26 42.5 13 29.97 0l-2.208 2.291 8.74 9.084H0v3.25Z"
      />
    </svg>
  )
}

export const IconRightArrowBold = memo(IconRightArrowBoldComponent)

export default IconRightArrowBold
