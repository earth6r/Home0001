import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconCheckComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 18"
      {...props}
    >
      <path
        fill="#000"
        d="M16.728.4 8.022 12.206l-5.147-5.29L.5 9.357 8.415 17.5 19.5 2.843 16.728.4Z"
      />
    </svg>
  )
}

export const IconCheck = memo(IconCheckComponent)

export default IconCheck
