import { type FC } from 'react'
import classNames from 'classnames'
import type { PropertiesBlockProps } from './types'
import { Block, RichText } from '@components/sanity'
import Link from 'next/link'
import { sendGoogleEvent } from '@lib/util'
import posthog from 'posthog-js'
import { useRouter } from 'next/router'
import { TypedObject } from 'sanity'
import IconSmallArrow from '@components/icons/IconSmallArrow'

export const PropertiesBlock: FC<PropertiesBlockProps> = ({
  header,
  properties,
  className,
}) => {
  const { asPath } = useRouter()

  return (
    <Block className={classNames(className, '')}>
      <div className="lg:max-w-[1000px] lg:mx-auto pl-x pr-menu md:px-fullmenu">
        <h2 className="mt-[-16px] text-h2 mb-y">
          {header || `0001 homes now available in:`}
        </h2>

        <div className="flex flex-col pr-x md:pr-0">
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
                      <div
                        className={classNames(
                          'inline-flex justify-between items-center w-[99px] relative px-[6px] pt-[4px] pb-[5px] bg-black text-white font-medium text-left uppercase'
                        )}
                      >
                        <IconSmallArrow
                          className="relative w-[1em] mt-[0.1em]"
                          fill="white"
                        />
                        <span className="leading-none">{`Explore`}</span>
                      </div>
                    )}
                  </Link>
                </div>
              )
            })}
        </div>
      </div>
    </Block>
  )
}

export default PropertiesBlock
