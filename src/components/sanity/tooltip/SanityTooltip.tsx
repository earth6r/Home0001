/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dialog } from '@headlessui/react'
import { PlainText } from '@studio/gen/sanity-schema'
import { useState, type FC, type HTMLAttributes } from 'react'
import { RichText } from '../rich-text'
import { IconX } from '@components/icons'

interface SanityTooltipCloseProps extends HTMLAttributes<HTMLElement> {
  onClose?: () => void
}

interface SanityTooltipProps extends HTMLAttributes<HTMLElement> {
  linkedCopy?: string
  tooltipContent?: PlainText
}

const CloseButton: FC<SanityTooltipCloseProps> = ({ onClose }) => {
  return (
    <div className="absolute top-1 right-1">
      <button onClick={onClose} className="p-4">
        <IconX className="w-[20px] h-[20px] stroke-2" />
      </button>
    </div>
  )
}

export const SanityTooltip: FC<SanityTooltipProps> = ({
  className,
  ...props
}) => {
  let [isOpen, setIsOpen] = useState(false)
  if (props.tooltipContent)
    return (
      <>
        <a
          aria-label={`Open Map`}
          onClick={() => setIsOpen(true)}
          className="inline hover:font-bold border-bottom"
        >
          {props.linkedCopy}
        </a>

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative max-w-[672px] w-full top-[72px] left-2 z-modal"
        >
          <Dialog.Panel className="block relative border-1 border-solid border-black w-full h-full bg-white">
            <CloseButton onClose={() => setIsOpen(false)} />
            <RichText blocks={props.tooltipContent} className={'p-x'} />
          </Dialog.Panel>
        </Dialog>
      </>
    )
}

export default SanityTooltip
