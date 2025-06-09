import { type FC, memo, useEffect, useState } from 'react'
import classNames from 'classnames'
import { BlockContent } from '@components/sanity'
import { PropertyElProps } from './types'
import { PropertyTypesList } from '@components/property-type'
import Link from 'next/link'
import IconChevron from '@components/icons/IconChevron'
import { Property as PropertyType } from '@studio/gen/sanity-schema'
import { useScroll, useTransform, motion } from 'framer-motion'

export const PropertyComponent: FC<PropertyElProps> = ({
  property,
  allProperties,
  block,
  className,
}) => {
  const [navOpen, setNavOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const fade = useTransform(scrollYProgress, [0.45, 0.46], [1, 0])

  useEffect(() => {
    if (navOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpen])

  const matchingCityProperties = allProperties
    ?.filter(
      (item: any) =>
        item?.location?.title === property?.location?.title &&
        item?.title !== property?.title
    )
    .sort(
      (a: any, b: any) =>
        b?.title?.localeCompare && b?.title?.localeCompare(a?.title)
    )

  return (
    <div
      className={classNames(
        className,
        navOpen ? 'right-[calc(100vw-60px)] lg:right-[33.33vw]' : 'right-0',
        'relative lg:pr-x transition-all duration-500'
      )}
    >
      <motion.div
        style={{ opacity: fade }}
        className={classNames(
          navOpen
            ? 'right-[-16px] lg:right-[calc(-66.666vw+72px)] pb-x bg-white overflow-scroll'
            : 'right-[calc(-100vw+44px)] lg:right-[calc(-100vw+44px)]',
          'flex flex-col justify-end gap-8 fixed w-[100svh] h-[calc(100vw+32px)] top-0 pl-header transform translate-x-[calc(100%+16px)] rotate-90 origin-top-left transition-all duration-500 border-none z-above'
        )}
      >
        {property?.location && (
          <h3 className="text-h3">{`${property.location.title}:`}</h3>
        )}

        {matchingCityProperties?.map((item: PropertyType | any, index) => {
          return (
            <Link
              onClick={() => setNavOpen(!navOpen)}
              href={`/property/${item.slug?.current}`}
              key={`${index}-${item.typeTitle}`}
            >
              <h2 className="inline border-bottom border-[6px] text-side">
                {item.title}
              </h2>
            </Link>
          )
        })}

        {matchingCityProperties && matchingCityProperties.length > 0 ? (
          <button
            onClick={() => setNavOpen(!navOpen)}
            className={classNames('flex items-end gap-2 ')}
          >
            <h2 className="text-side">{property?.title}</h2>

            <div
              className={classNames(
                navOpen ? 'rotate-180' : '',
                'flex items-center justify-center relative w-[21px] h-[21px] bottom-[3px] bg-black transition-transform duration-500'
              )}
            >
              <IconChevron width="12" fill="white" className="rotate-0" />
            </div>
          </button>
        ) : (
          <div className={classNames('flex items-end gap-2 ')}>
            <h2 className="text-side">{property?.title}</h2>
          </div>
        )}
      </motion.div>

      <div
        className={classNames(
          navOpen
            ? 'opacity-0 lg:opacity-100 duration-100 delay-300'
            : 'opacity-100 duration-100',
          'lg:grid lg:grid-cols-2 gap-y block relative lg:pl-x transition-opacity'
        )}
      >
        <div className="flex flex-col pr-x md:pl-x md:pr-0 lg:pl-0">
          <div className="pl-x md:pl-0 lg:overflow-hidden lg:pb-[2px]">
            {property?.body && (
              <BlockContent
                blocks={property?.body}
                grid={false}
                className=" lg:mt-0 overflow-visible"
              />
            )}
          </div>
        </div>

        <div className="col-start-1 lg:col-span-2 pr-menu md:pr-0">
          {!block && (
            <div className="px-x md:pl-x md:pr-0 lg:pl-0 pt-ydouble mt-ydouble overflow-hidden">
              {property?.propertyTypesList && (
                <>
                  <h2 className="text-h2">Available Homes:</h2>
                  <PropertyTypesList
                    className="grid grid-cols-1 lg:grid-cols-4 md:w-1/2 lg:w-full gap-x mt-y"
                    propertyTypesList={property?.propertyTypesList}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const Property = memo(PropertyComponent)

export default Property
