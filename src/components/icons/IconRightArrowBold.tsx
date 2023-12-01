import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconRightArrowBoldComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 45 29"
      {...props}
    >
      <path
        fill={props.fill || '#fff'}
        fillRule="evenodd"
        d="M30.452 0 45 14.5 30.452 29l-3.943-3.93 7.818-7.791H0V11.72h34.327l-7.818-7.79L30.452 0Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const IconRightArrowBold = memo(IconRightArrowBoldComponent)

export default IconRightArrowBold
