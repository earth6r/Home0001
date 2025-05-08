import { type FC } from 'react'
import classNames from 'classnames'
import { sendGoogleEvent } from '@lib/util'
import { CitiesListProps } from '@components/sanity/blocks/properties/types'
import { SanityLinkType } from '@studio/lib'
import posthog from 'posthog-js'
import { useRouter } from 'next/router'
import { useHeaderLinks } from '@contexts/header'
import { SanityLink } from '@components/sanity'

export const CitiesList: FC<CitiesListProps> = ({ citiesList }) => {
  const [headerLinksShown, setHeaderLinksShown] = useHeaderLinks()
  const { asPath } = useRouter()

  return (
    <ul>
      {citiesList &&
        citiesList.map(({ _id, title, active, propertyLink }, index) => {
          return (
            <li key={_id} className="text-left">
              {propertyLink ? (
                <SanityLink
                  {...(propertyLink as SanityLinkType)}
                  onClick={() =>
                    posthog.capture('property_click', {
                      slug: propertyLink?.internalLink?.slug?.current,
                      route: asPath,
                    })
                  }
                  className={classNames(
                    'text-h2 underline decoration-[0.1em] underline-offset-2'
                  )}
                >
                  <div
                    onClick={() => {
                      sendGoogleEvent(`clicked city button`, { city: title })
                      setHeaderLinksShown(true)
                    }}
                  >
                    <span>{`${title},`}</span>
                  </div>
                </SanityLink>
              ) : (
                <div
                  className={classNames(
                    'text-h2 bg-transparent text-lightgray'
                  )}
                >
                  <span
                    className={classNames(
                      active && propertyLink ? 'leading-none' : ''
                    )}
                  >
                    {index + 1 === citiesList.length
                      ? `${title}.`
                      : `${title},`}
                  </span>
                </div>
              )}
            </li>
          )
        })}
    </ul>
  )
}
