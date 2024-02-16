import { useState, type FC, type HTMLAttributes } from 'react'
import { Modal } from '@components/modal'
import classNames from 'classnames'
import { sendGoogleEvent } from '@lib/util'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { RichText } from '../rich-text'
import { useLenis } from '@studio-freight/react-lenis'
import IconSmallArrow from '@components/icons/IconSmallArrow'

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
        title={title}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          lenis.resize()
        }}
      >
        <div className="pt-header pb-[6rem] md:pb-ydouble px-x md:px-xhalf h-full flex flex-col text-sm overflow-y-scroll">
          <div>
            {inventory && <RichText blocks={inventory} className="inventory" />}
          </div>
        </div>
      </Modal>

      <div className="flex items-center gap-[5px] py-[4px] px-[6px] border-black">
        <IconSmallArrow fill="black" width="15" height="11" />
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
