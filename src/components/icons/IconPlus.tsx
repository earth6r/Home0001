import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconPlusComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="#000"
        stroke="#000"
        strokeWidth=".3"
        d="M12.15 8.508v.15h-3.5v3.492h-1.3V8.658h-3.5v-1.3h3.5V3.85h1.3v3.508h3.5v1.15Z"
      />
    </svg>
  )
}

export const IconPlus = memo(IconPlusComponent)

export default IconPlus
