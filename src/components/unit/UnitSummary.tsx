import { type FC, useContext } from 'react'
import { HomeContext } from '@contexts/home'
import classNames from 'classnames'
import { KeyedUnitProps, UnitListProps } from './types'
import slugify from 'slugify'
import { useRouter } from 'next/router'
import { sendGoogleEvent, sendHubspotEvent } from '@lib/util'
import { SanityLink, SanityMedia } from '@components/sanity'
import { SanityLinkType } from '@studio/lib'
import Link from 'next/link'
import { ImageCarousel } from '@components/carousel'
import { IconSmallArrow } from '@components/icons/IconSmallArrow'
import { redirect } from 'next/navigation'

export const UnitSummary: FC<UnitListProps> = ({ unit, border, className }) => {
  const router = useRouter()
  const { dispatch, state } = useContext(HomeContext)

  const dispatchUnit = (unit: KeyedUnitProps, title?: string) => {
    dispatch({
      ...state,
      type: 'SET_UNIT',
      payload: {
        unit: unit,
        unitSlug: title,
      },
    })
  }

  const updatePath = (title?: string) => {
    if (title !== router.query.unit && router.query.city) {
      router.push(`?city=${router.query.city}&unit=${title}`, undefined, {
        shallow: true,
      })
    }
  }

  const updateUnit = (unit: KeyedUnitProps, title?: string) => {
    if (unit._id === state.unit?._id) return
    const slugifiedTitle = title && slugify(title, { lower: true })
    dispatchUnit(unit, slugifiedTitle)
    updatePath(slugifiedTitle)

    if (unit.title) {
      const options = { unit: unit.title }
      sendGoogleEvent('clicked unit', options)
      // sendHubspotEvent('tile clicked', unit.title)
    }
  }

  if (!unit) return null
  const summaryPhotos = unit?.photographs?.slice(0, 4)

  return (
    <li className={className}>
      <div
        className={classNames(
          border ? 'pt-ylg md:pt-page border-top' : '',
          'w-auto mx-x md:ml-0'
        )}
      ></div>
      <div
        className={classNames(
          unit.available ? '' : 'bg-white shadow-none opacity-30',
          `w-auto flex-col pl-4 md:pl-0`
        )}
      >
        <div className="flex flex-col gap-1 mb-4 pr-4 md:pr-0">
          <p className="col-start-1 text-left text-lg uppercase">
            {unit.title && <span>{unit.title}</span>}
          </p>
        </div>
        <div className="z-above">
          <div className="flex flex-col relative mt-4 overflow-x-hidden">
            {unit?.photographs && unit?.photographs.length > 0 && (
              <ImageCarousel
                index="0"
                slides={unit?.photographs}
                carousel={true}
                arrows={false}
                className="md:max-w-[346px] mb-4"
              />
            )}
            <div className="block w-auto max-w-[467px] bg-darkgray py-x pl-x mr-4 md:mr-0 pr-menu">
              <div className="mb-2 text-left rich-text">
                <p className="small md:col-start-1 col-start-2 md:col-span-1 text-left">
                  {unit.price}
                </p>
                {unit.area && (
                  <p className="small mb-5">
                    {unit.area}
                    <br />
                    Fully furnished & equipped.
                    <br />
                    Access to homes in other locations.
                  </p>
                )}
              </div>

              {unit.slug && (
                <Link
                  href={`/unit/${unit.slug?.current}`}
                  onClick={() => {
                    updateUnit(unit, unit.title)
                  }}
                >
                  <button
                    className={classNames(
                      `relative border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center w-full h-12 max-h-12 hover:invert bg-white font-bold text-xs z-above p-4`
                    )}
                    onClick={() => {
                      updateUnit(unit, unit.title)
                    }}
                  >
                    <span className="mb-0 py-2 text-left uppercase">
                      {`Explore ${unit?.title}`}
                    </span>
                    <IconSmallArrow width="22" height="12" className="invert" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default UnitSummary
