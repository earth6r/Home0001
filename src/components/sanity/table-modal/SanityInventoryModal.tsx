import { useState, type FC, type HTMLAttributes } from 'react'
import { Modal } from '@components/modal'
import classNames from 'classnames'
import { sendGoogleEvent } from '@lib/util'
import IconSmallBlackArrow from '@components/icons/IconSmallBlackArrow'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { RichText } from '../rich-text'
import { useLenis } from '@studio-freight/react-lenis'

interface SanityInventoryModalProps extends HTMLAttributes<HTMLElement> {
  inventory: RichTextType
  title: string
  buttonLabel: string
  unit?: string
}

export const SanityInventoryModal: FC<SanityInventoryModalProps> = ({
  inventory,
  title,
  buttonLabel,
  className,
  unit,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const lenis = useLenis()

  const handleGoogleEvent = () => {
    if (unit) {
      const options = { location: window.location.pathname }
      sendGoogleEvent('clicked inventory', options)
    }
  }
  return (
    <div className={className}>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          lenis.resize()
        }}
      >
        <div className="py-[19px] md:py-[33px] px-x md:px-xhalf h-full flex flex-col text-sm overflow-y-scroll">
          <span className="uppercase font-medium mb-y">{title}</span>

          <div className="pb-y">
            {inventory && <RichText blocks={inventory} className="inventory" />}
          </div>
        </div>
      </Modal>

      <div className="flex items-center gap-[5px] py-[4px] px-[6px] border-black">
        <IconSmallBlackArrow width="13" height="9" />
        <button
          onClick={() => {
            setIsOpen(true)
            handleGoogleEvent()
          }}
          className="uppercase font-medium leading-none"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

export default SanityInventoryModal
