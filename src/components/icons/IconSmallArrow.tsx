import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconSmallArrowComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 10"
      {...props}
    >
      <path
        fill={props.fill || '#fff'}
        fillRule="evenodd"
        d="M10.667 0 15.5 5l-4.833 5-1.131-1.17 2.9-3.002H.5V4.172h11.937L9.536 1.171 10.667 0Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const IconSmallArrow = memo(IconSmallArrowComponent)

export default IconSmallArrow
