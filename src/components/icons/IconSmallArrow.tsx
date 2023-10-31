import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconSmallArrowComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 13 9"
      {...props}
    >
      <path
        fill={props.fill || '#fff'}
        d="M0 5.063h11.05L8.205 8.207 8.928 9 13 4.5 8.928 0 8.21.793l2.84 3.144H0v1.126Z"
      />
    </svg>
  )
}

export const IconSmallArrow = memo(IconSmallArrowComponent)

export default IconSmallArrow
