/* eslint-disable jsx-a11y/anchor-is-valid */
import { PlainText } from '@studio/gen/sanity-schema'
import { useState, type FC, type HTMLAttributes } from 'react'
import { RichText } from '../rich-text'
import { IconX } from '@components/icons'
import {
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@chakra-ui/react'

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
  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger="click"
      placement="top-end"
    >
      <PopoverTrigger>
        <a
          aria-label={`Open tooltip`}
          onClick={() => setIsOpen(true)}
          className="inline hover:font-bold border-bottom"
        >
          {props.linkedCopy}
        </a>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          variants={{}}
          className="relative max-w-[calc(100vw-2rem)] md:max-w-[672px] w-full border-1 border-black border-solid left-x md:left-2 bg-white z-modal"
        >
          <CloseButton onClose={() => setIsOpen(false)} />
          {props.tooltipContent && (
            <RichText
              blocks={props.tooltipContent}
              className={'bg-white p-[40px] md:p-x'}
            />
          )}
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default SanityTooltip
