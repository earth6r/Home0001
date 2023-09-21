import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconPlusComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 12 12"
      {...props}
    >
      <path stroke="#000" d="M0 6h11.314M5.657.343v11.314" />
    </svg>
  )
}

export const IconPlus = memo(IconPlusComponent)

export default IconPlus
