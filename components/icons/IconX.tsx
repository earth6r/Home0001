import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconXComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width={23} height={24} viewBox="0 0 23 24" {...props}>
      <path
        d="M22.967 18.284l-6.402-6.402 4.576-4.576a3.496 3.496 0 10-4.943-4.944L11.62 6.94 5.221.538.275 5.48l6.401 6.401L2.1 16.457a3.496 3.496 0 004.944 4.944l4.576-4.576 6.402 6.4 4.944-4.942z"
        fill="currentColor"
      />
    </svg>
  )
}

export const IconX = memo(IconXComponent)

export default IconX
