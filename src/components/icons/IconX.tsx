import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconXComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 40 40"
      {...props}
    >
      <path stroke="#000" d="m8 8 24 24m0-24L8 32" />
    </svg>
  )
}

export const IconX = memo(IconXComponent)

export default IconX
