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
        <div className="pt-header pb-[6rem] md:pb-ydouble px-x h-full flex flex-col text-sm overflow-y-scroll">
          <div className="flex flex-wrap gap-xhalf">
            {inventory &&
              inventory.items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    activeIndex === index
                      ? setActiveIndex(null)
                      : setActiveIndex(index)
                  }}
                  className={classNames(
                    activeIndex === index
                      ? 'w-full text-black bg-gray duration-500'
                      : 'w-[calc(34.08%-var(--space-x-half))] xl:w-[calc(33.9%-var(--space-x-half))] text-white bg-black duration-500',
                    'flex items-center justify-center relative p-x aspect-square transition-[width]'
                  )}
                >
                  <SanityImage
                    asset={item.image}
                    props={{ alt: 'Inventory Image', sizes: '400px' }}
                    className={classNames(
                      activeIndex === index ? 'opacity-100' : 'opacity-0',
                      'absolute w-full h-full aspect-square top-0 left-0 duration-500'
                    )}
                  />
                  <span
                    className={classNames(
                      activeIndex === index
                        ? 'top-xhalf duration-700'
                        : 'top-1/2 -translate-y-1/2 duration-700',
                      'p-xhalf absolute text-sm uppercase font-medium transform transition-all'
                    )}
                  >
                    {item.title}
                  </span>
                </button>
              ))}
          </div>
        </div>
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
