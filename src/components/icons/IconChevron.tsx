import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconChevronComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        fill="#000"
        fill-rule="evenodd"
        d="M4.812 1.505a.88.88 0 0 0-1.273 1.216l4.405 4.61-4.405 4.611a.88.88 0 0 0 1.273 1.216l5.566-5.826-5.566-5.827Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const IconChevron = memo(IconChevronComponent)

export default IconChevron
