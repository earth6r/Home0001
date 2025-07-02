import { HTMLAttributes, type FC } from 'react'
import classNames from 'classnames'
import { RichText } from '@components/sanity'
import Link from 'next/link'
import { sendGoogleEvent } from '@lib/util'
import posthog from 'posthog-js'
import { useRouter } from 'next/router'
import { TypedObject } from 'sanity'
import { KeyedProperty } from '@components/sanity/blocks/properties/types'
import { ArrowBtn } from '@components/btns'

export interface PropertyListProps extends HTMLAttributes<HTMLDivElement> {
  header?: string
  properties?: KeyedProperty[]
}

export const PropertyList: FC<PropertyListProps> = ({
  header,
  properties,
  className,
}) => {
  const { asPath } = useRouter()

  return (
    <div className={className}>
      <h2
        className={classNames(
          asPath === '/' ? 'font-bold' : 'lg:w-[calc(100vw-var(--space-menu))]',
          `-mt-y text-h2 mb-y`
        )}
      >
        {header}
      </h2>

      <div className="flex flex-col">
        {properties &&
          properties.map(({ longTitle, slug, available }, index) => {
            return (
              <div
                key={`property-${slug?.current}`}
                className={classNames(
                  available === false ? 'pointer-events-none' : '',
                  'border-bottom--gray last-of-type:border-none'
                )}
              >
                <Link
                  href={`/property/${slug?.current}`}
                  onClick={() => {
                    sendGoogleEvent('Click home property tile', {
                      tileProperty: slug.current,
                    })
                    posthog.capture('property_click', {
                      slug: slug.current,
                      route: asPath,
                    })
                  }}
                  className={classNames(
                    available === false ? 'opacity-40' : '',
                    'flex justify-between items-center gap-x relative w-full h-[59px]'
                  )}
                >
                  <RichText
                    blocks={longTitle as TypedObject | TypedObject[]}
                    className={classNames(
                      available === false ? '' : 'underlined',
                      'w-[calc(100%-99px-var(--space-x))] uppercase line-clamp-2'
                    )}
                  />

                  {available !== false && (
                    <ArrowBtn type="div" text="Explore" />
                  )}
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default PropertyList
