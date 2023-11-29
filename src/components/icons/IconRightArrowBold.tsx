import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconRightArrowBoldComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 45 30"
      {...props}
    >
      <path
        stroke={props.fill || '#fff'}
        stroke-width="5.5"
        d="M0 15.278h40.5m0 0L28.094 2.872M40.5 15.278 28.094 27.684"
      />
    </svg>
  )
}

export const IconRightArrowBold = memo(IconRightArrowBoldComponent)

export default IconRightArrowBold
