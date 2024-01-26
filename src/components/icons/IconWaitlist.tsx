import type { SVGProps } from 'react'
import { memo } from 'react'

export const IconWaitlistComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 97 23"
      {...props}
    >
      <path fill="#000" d="M0 0h96.851v23H0z" />
      <path
        fill="#fff"
        stroke="#fff"
        stroke-width=".25"
        d="M5.875 12.063v.124h11.729l-2.857 2.933-.086.087.086.087.778.794.09.09.089-.09 4.386-4.5.084-.088-.084-.087-4.386-4.5-.09-.092-.089.092-.773.793-.085.087.085.087 2.853 2.933H5.875v1.25Z"
      />
      <path
        fill="#fff"
        d="M25 6.264h1.988l1.232 5.04c.07.322.154.686.224 1.078s.126.756.168 1.106c.056.406.112.812.154 1.218h.028l.21-1.26c.07-.35.14-.728.21-1.134.07-.392.14-.742.21-1.064l1.274-4.984h1.904l1.26 4.97c.07.322.154.672.224 1.078s.126.784.182 1.134l.196 1.26h.028c.056-.406.112-.826.182-1.232.056-.35.126-.728.196-1.12.07-.378.14-.742.224-1.064l1.232-5.026h1.988L35.43 16.68h-1.89l-1.33-5.446a14.93 14.93 0 0 1-.21-.952c-.07-.35-.126-.7-.168-1.022-.056-.378-.112-.756-.168-1.148h-.028c-.056.392-.112.77-.168 1.148a15.48 15.48 0 0 1-.168 1.022c-.07.364-.126.686-.196.952l-1.4 5.446h-1.932L25 6.264Z"
      />
      <path
        fill="#fff"
        d="M41.666 6.264h2.072l3.794 10.416H45.46l-.826-2.478h-3.948l-.84 2.478h-1.96l3.78-10.416Zm-.504 6.51h2.996l-.798-2.408c-.098-.308-.196-.616-.266-.91-.084-.294-.154-.56-.21-.798-.07-.28-.126-.546-.182-.798h-.028c-.07.294-.154.588-.224.882-.07.252-.14.518-.21.812-.084.294-.168.574-.252.812l-.826 2.408Z"
      />
      <path fill="#fff" d="M48.658 6.264h1.946V16.68h-1.946V6.264Z" />
      <path
        fill="#fff"
        d="M51.947 6.264h8.456V7.93H57.14v8.75h-1.947V7.93h-3.248V6.264Z"
      />
      <path fill="#fff" d="M61.715 6.264h1.932v8.722h5.068v1.694h-7V6.264Z" />
      <path fill="#fff" d="M70.048 6.264h1.946V16.68h-1.946V6.264Z" />
      <path
        fill="#fff"
        d="M77.873 16.918c-.714 0-1.358-.084-1.904-.266-.56-.168-1.036-.406-1.414-.728a3.266 3.266 0 0 1-.882-1.12 3.54 3.54 0 0 1-.35-1.456h1.946c.14 1.344 1.008 2.016 2.618 2.016.28 0 .546-.028.798-.098.252-.056.476-.154.672-.28.182-.126.336-.28.448-.476.098-.182.154-.406.154-.672 0-.28-.056-.518-.182-.7a1.5 1.5 0 0 0-.546-.462 4.794 4.794 0 0 0-.84-.322c-.336-.084-.714-.168-1.12-.266-.49-.112-.938-.238-1.372-.364a3.858 3.858 0 0 1-1.134-.532 2.375 2.375 0 0 1-.77-.854c-.196-.336-.294-.77-.294-1.288 0-.49.098-.924.294-1.302.182-.364.448-.672.798-.924.35-.238.756-.434 1.218-.56.462-.126.98-.182 1.54-.182 1.218 0 2.17.266 2.856.812.672.546 1.064 1.302 1.162 2.268h-1.89c-.07-.518-.294-.91-.672-1.19-.378-.266-.868-.406-1.484-.406-.588 0-1.05.112-1.4.336-.35.238-.532.56-.532.98 0 .238.056.448.182.602.126.154.294.294.532.406.224.112.504.21.826.294.322.084.672.168 1.078.252.49.098.952.224 1.4.364.434.14.826.322 1.176.56.35.238.616.546.826.924.21.378.308.84.308 1.4 0 .518-.098.98-.308 1.386-.21.406-.49.742-.84 1.008a4.071 4.071 0 0 1-1.288.616 5.393 5.393 0 0 1-1.61.224Z"
      />
      <path
        fill="#fff"
        d="M82.395 6.264h8.456V7.93h-3.262v8.75h-1.946V7.93h-3.248V6.264Z"
      />
    </svg>
  )
}

export const IconWaitlist = memo(IconWaitlistComponent)

export default IconWaitlist