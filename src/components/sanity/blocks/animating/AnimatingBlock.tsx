import type { FC } from 'react'
import classNames from 'classnames'
import type { AnimatingBlock as AnimatingBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement, SanityMediaProps } from '@components/sanity'
import {
  Block,
  RichText,
  SanityFigure,
  SanityLink,
  SanityMedia,
} from '@components/sanity'
import { sendGoogleEvent } from '@lib/util'
import IconRightArrowBold from '@components/icons/IconRightArrowBold'
import { CitiesListProps } from '../cities/types'
import { SanityLinkType } from '@studio/lib'

type AnimatingBlockProps = Omit<SanityBlockElement, keyof AnimatingBlockType> &
  AnimatingBlockType

const CitiesList: FC<CitiesListProps> = ({ citiesList }) => (
  <ul>
    {citiesList &&
      citiesList.map(({ _id, title, active, propertyLink }) => {
        return (
          <li key={_id} className="text-left">
            {propertyLink ? (
              <SanityLink
                {...(propertyLink as SanityLinkType)}
                className={classNames('text-lg font-bold uppercase')}
              >
                <div
                  onClick={() =>
                    sendGoogleEvent(`clicked city button`, { city: title })
                  }
                >
                  <span
                    className={classNames(
                      active && propertyLink ? 'leading-none' : ''
                    )}
                  >
                    {title}
                  </span>
                </div>
              </SanityLink>
            ) : (
              <div
                className={classNames(
                  'text-lg font-bold uppercase bg-transparent opacity-30 shadow-none'
                )}
              >
                <span
                  className={classNames(
                    active && propertyLink ? 'leading-none' : ''
                  )}
                >
                  {title}
                </span>
              </div>
            )}
          </li>
        )
      })}
  </ul>
)

export const AnimatingBlock: FC<AnimatingBlockProps> = ({
  textAndImages,
  citiesPosition,
  citiesList,
  className,
}) => {
  return (
    <Block className={classNames(className, 'px-x m-0')}>
      <div className="md:col-start-2 md:col-span-1">
        {textAndImages &&
          textAndImages.map(({ _key, media, text }, index) => {
            return (
              <div key={_key}>
                {media && (
                  <SanityMedia
                    imageProps={{
                      alt: media.alt || 'Building image',
                      quality: 8,
                      priority: true,
                      sizes: '(max-width: 768px) 100vw, 33vw',
                      lqip: (media?.image as any)?.asset?.metadata?.lqip,
                    }}
                    className="w-full h-auto object-contain mt-3"
                    {...(media as any)}
                  />
                )}

                {text && <RichText blocks={text} className="mt-3" />}

                {index === citiesPosition && (
                  <div className="mt-3">
                    <CitiesList citiesList={citiesList} />
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </Block>
  )
}

export default AnimatingBlock
