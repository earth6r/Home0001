import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconMinusComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 8 1"
      {...props}
    >
      <path stroke="#000" d="M0 .5h8" />
    </svg>
  )
}

export const IconMinus = memo(IconMinusComponent)

export default IconMinus
