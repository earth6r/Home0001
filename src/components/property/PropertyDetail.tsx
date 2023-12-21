import { type FC, memo } from 'react'
import classNames from 'classnames'
import { BlockContent, RichText, SanityMedia } from '@components/sanity'
import MapDialog from '@components/map/MapDialog'
import { UnitsList } from '@components/unit'
import { PropertyElProps } from './types'
import { Map } from '@components/map'
import Link from 'next/link'

export const PropertyDetailComponent: FC<PropertyElProps> = ({
  property,
  className,
}) => {
  return (
    <div className={classNames(className, 'md:pl-x')}>
      <h2 className="mb-12 text-xl md:text-2xl font-bold uppercase">
        HOME0001:
        <br />
        {property?.title}
      </h2>
      <div className="md:grid md:grid-cols-8 gap-10 md:col-start-1 block relative">
        <div className="grid grid-cols-[1fr_177px] md:flex md:flex-col md:col-span-3 md:justify-start md:items-start md:sticky top-[var(--header-height)] left-0 md:h-[48vw]">
          {property?.image && (
            <div className="col-span-2 block relative w-full mb-yhalf z-base">
              <SanityMedia
                imageProps={{
                  alt: property?.image.alt || 'Building image',
                  quality: 8,
                  priority: true,
                  lqip: (property?.image?.image as any)?.asset?.metadata?.lqip,
                }}
                {...(property?.image as any)}
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          <div className="col-span-2">
            {property?.coordinates && (
              <Map coordinates={property.coordinates} />
            )}
            {property?.header && (
              <RichText blocks={property?.header} className="mt-yhalf" />
            )}
          </div>
        </div>

        <div className="col-span-5 overflow-x-hidden">
          {property?.body && (
            <BlockContent
              blocks={property?.body}
              grid={false}
              className="mt-ydouble md:mt-0 overflow-hidden"
            />
          )}
        </div>

        <div className="mt-ydouble md:max-w-[346px] pr-menu">
          <Link href={'./how-it-works'}>
            <button
              className={classNames(
                'w-full relative border-1 border-black border-solid mb-[2px] flex flex-row justify-center items-center h-12 max-h-12 bg-black text-white text-xs uppercase font-medium tracking-tight z-above p-4'
              )}
            >
              {`how it works`}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const PropertyDetail = memo(PropertyDetailComponent)

export default PropertyDetail
