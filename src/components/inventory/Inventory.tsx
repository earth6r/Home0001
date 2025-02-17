import { useState, type FC, type HTMLAttributes } from 'react'
import classNames from 'classnames'
import { SanityImageAsset } from 'sanity-codegen'
import { SanityImage } from '@components/sanity/media'

interface InventoryProps extends HTMLAttributes<HTMLElement> {
  inventory?: {
    items: {
      title: string
      image: SanityImageAsset
    }[]
  }
}

export const Inventory: FC<InventoryProps> = ({ inventory, className }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className={className}>
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
  )
}

export default Inventory
