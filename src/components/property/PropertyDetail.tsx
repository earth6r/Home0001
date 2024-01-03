import { type FC, memo } from 'react'
import classNames from 'classnames'
import { BlockContent, RichText, SanityMedia } from '@components/sanity'
import { PropertyElProps } from './types'
import { Map } from '@components/map'
import Link from 'next/link'

export const PropertyDetailComponent: FC<PropertyElProps> = ({
  property,
  footerCopy,
  className,
}) => {
  const filteredBody = property?.body && [
    property?.body[3],
    property?.body[4],
    property?.body[0],
    property?.body[1],
  ]

  const filteredBodyFooter = property?.body && [
    property?.body[2],
    property?.body[5],
  ]

  return (
    <div className={classNames(className)}>
      <h2 className="mb-12 text-xl md:text-2xl font-bold uppercase">
        HOME0001:
        <br />
        {property?.title}
      </h2>
      <div className="md:grid md:grid-cols-8 gap-10 md:col-start-1 block relative">
        <div className="grid grid-cols-[1fr_177px] md:flex md:flex-col md:col-span-3 md:justify-start md:items-start md:h-[48vw] pr-x md:pr-0">
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

          <div className="col-span-2 md:col-span-5 md:w-full">
            {property?.coordinates && (
              <Map coordinates={property.coordinates} height={415} />
            )}
            {property?.header && (
              <RichText
                blocks={property?.header}
                className="mt-yhalf md:px-xhalf"
              />
            )}
          </div>
        </div>

        <div className="col-span-5 overflow-x-hidden pr-x md:pr-0">
          {filteredBody && (
            <BlockContent
              blocks={filteredBody}
              grid={false}
              className="mt-ydouble md:mt-0 overflow-hidden"
            />
          )}
        </div>
      </div>

      <div className="md:grid md:grid-cols-5 mt-page mb-ydouble md:my-ydouble pr-x md:pr-0">
        <div className="md:col-span-4 overflow-x-hidden">
          {filteredBodyFooter && (
            <BlockContent
              blocks={filteredBodyFooter[0]}
              grid={false}
              className="mt-ydouble md:mt-0 overflow-hidden hide-cta"
            />
          )}

          <div className="md:col-span-3 mb-y mt-yhalf md:max-w-[346px] pr-menu md:pr-0">
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

          {filteredBodyFooter && (
            <BlockContent
              blocks={filteredBodyFooter[1]}
              grid={false}
              className="mt-ydouble md:mt-0 overflow-hidden hide-cta"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export const PropertyDetail = memo(PropertyDetailComponent)

export default PropertyDetail
