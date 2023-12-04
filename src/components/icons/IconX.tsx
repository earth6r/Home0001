import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconXComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 10"
      {...props}
    >
      <path
        fill={props.fill || '#000'}
        fill-rule="evenodd"
        d="M3.761 5 0 1.239 1.239 0 5 3.761 8.761 0 10 1.239 6.239 5 10 8.761 8.761 10 5 6.239 1.239 10 0 8.761 3.761 5Z"
        clip-rule="evenodd"
      />
    </svg>
  )
}

export const IconX = memo(IconXComponent)

export default IconX
