import { useState, type FC, type HTMLAttributes } from 'react'
import { Modal } from '@components/modal'
import classNames from 'classnames'
import { sendGoogleEvent } from '@lib/util'
import { useLenis } from '@studio-freight/react-lenis'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { SanityImageAsset } from 'sanity-codegen'
import { SanityImage } from '../media'
import posthog from 'posthog-js'
import { useRouter } from 'next/router'
import { Inventory } from '@components/inventory'

interface SanityInventoryModalProps extends HTMLAttributes<HTMLElement> {
  inventory?: {
    items: {
      title: string
      image: SanityImageAsset
    }[]
  }
  title: string
  buttonLabel: string
  unit?: string
  buttonType?: 'button' | 'link'
}

export const SanityInventoryModal: FC<SanityInventoryModalProps> = ({
  inventory,
  title,
  buttonLabel,
  buttonType = 'button',
  className,
  unit,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const lenis = useLenis()
  const { asPath } = useRouter()

  const handleEvents = () => {
    if (unit) {
      const options = { location: window.location.pathname }
      sendGoogleEvent('clicked inventory', options)

      posthog.capture('inventory_clicked', {
        unit: unit,
        location: asPath,
      })
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
          setActiveIndex(null)
        }}
      >
        <Inventory
          inventory={inventory}
          className="pt-header pb-[6rem] md:pb-ydouble px-x h-full flex flex-col text-sm overflow-y-scroll"
        />
      </Modal>

      {buttonType === 'button' ? (
        <div className="flex items-center gap-[5px] py-[4px] px-[6px] border-black">
          <IconSmallArrow fill="black" width="15" height="11" />
          <button
            onClick={() => {
              setIsOpen(true)
              handleEvents()
            }}
            className="uppercase font-medium leading-none"
          >
            {buttonLabel}
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setIsOpen(true)
            handleEvents()
          }}
          className="inline underline text-left"
        >
          {buttonLabel}
        </button>
      )}
    </div>
  )
}

export default SanityInventoryModal
