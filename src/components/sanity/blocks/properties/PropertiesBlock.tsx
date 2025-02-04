import { useRef, type FC, useState } from 'react'
import classNames from 'classnames'
import type { PropertiesBlockProps } from './types'
import { Block, RichText } from '@components/sanity'
import Link from 'next/link'
import { sendGoogleEvent } from '@lib/util'
import IconRightArrowBold from '@components/icons/IconRightArrowBold'
import SCREENS from '@globals/screens'
import { type SwiperOptions } from 'swiper/types'
import posthog from 'posthog-js'
import { useRouter } from 'next/router'
import { TypedObject } from 'sanity'

export const PropertiesBlock: FC<PropertiesBlockProps> = ({
  header,
  properties,
  className,
}) => {
  const { asPath } = useRouter()
  const slidesRef = useRef(null)
  const breakpoints: SwiperOptions['breakpoints'] = {
    0: {
      slidesPerView: 1.185,
    },
    [SCREENS.md]: {
      slidesPerView: 2,
    },
  }
  const [activeNav, setActiveNav] = useState(false)

  return (
    <Block className={classNames(className, 'mt-ydouble py-ydouble')}>
      <div className="lg:max-w-[1000px] lg:mx-auto pl-x pr-menu md:px-fullmenu">
        <h2 className="mb-ydouble text-h2">{header || `Now available in:`}</h2>

        <div className="flex flex-col pr-x md:pr-0">
          {properties &&
            properties.map(({ longTitle, slug, available }, index) => (
              <div
                key={`property-${slug.current}`}
                className={classNames(
                  available === false ? 'opacity-40 pointer-events-none' : '',
                  'border-bottom last-of-type:border-none'
                )}
              >
                <Link
                  href={`/property/${slug.current}`}
                  onClick={() => {
                    sendGoogleEvent('Click home property tile', {
                      tileProperty: slug.current,
                    })
                    posthog.capture('property_click', {
                      slug: slug.current,
                      route: asPath,
                    })
                  }}
                  className="flex justify-between items-center gap-x relative w-full h-[59px]"
                >
                  <RichText
                    blocks={longTitle as TypedObject | TypedObject[]}
                    className="uppercase underline line-clamp-2"
                  />
                  {available !== false && (
                    <div
                      className={classNames(
                        'inline-flex justify-between items-center w-[99px] relative px-[6px] pt-[4px] pb-[5px] bg-black text-white font-medium text-left uppercase'
                      )}
                    >
                      <IconRightArrowBold
                        className="relative w-[1em] mt-[0.1em]"
                        fill="white"
                      />
                      <span className="leading-none">{`Explore`}</span>
                    </div>
                  )}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </Block>
  )
}

export default PropertiesBlock
