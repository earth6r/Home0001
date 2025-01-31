import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconChevronComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 11 7"
      {...props}
    >
      <path
        fill={props.fill || '#000'}
        fillRule="evenodd"
        d="M1.22984 0.00366211L5.24609 4.01991L9.26234 0.00366211L10.4961 1.5L5.24609 7L-0.00390625 1.5L1.22984 0.00366211Z"
      />
    </svg>
  )
}

export const IconChevron = memo(IconChevronComponent)

export default IconChevron
