import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconRightArrowComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 10"
      {...props}
    >
      <path
        fill={props.fill || '#000'}
        d="m15.52 0 5.98 5-5.98 5-1.029-.848 4.232-3.538H.5V4.386h18.223L14.491.86 15.52 0Z"
      />
    </svg>
  )
}

export const IconRightArrow = memo(IconRightArrowComponent)

export default IconRightArrow
