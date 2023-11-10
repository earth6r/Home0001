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
import { redirect } from 'next/navigation'
export const UnitSummary: FC<UnitListProps> = ({ unit }) => {
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
    <li>
      <div
        className={classNames(
          unit.available ? '' : 'bg-white shadow-none opacity-30',
          `transition-colors   px-4 pt-4 pb-0 min-h-[16rem] w-full grid justify-stretch flex-col`
        )}
      >
        <div className="flex flex-col gap-1 mb-4">
          <p className="col-start-1 text-left uppercase">
            {unit.title && <span>{unit.title}</span>}
          </p>
          <p className="md:col-start-1 col-start-2 md:col-span-1 text-left">
            {unit.price}
          </p>
        </div>
        <div className="mb-5 z-above">
          {/* <SanityMedia
            image={unit.headlineImage?.image as any}
            imageProps={{
              alt: unit.headlineImage?.alt || 'Home0001 Headline Image',
              style: { maxWidth: '100%', height: 'auto' },
              lqip: (unit.headlineImage?.image as any)?.asset?.metadata.lqip,
              quality: 8,
            }}
          /> */}
          <div className="flex flex-col relative mt-10">
            {unit?.photographs && unit?.photographs.length > 0 && (
              <ImageCarousel
                index="0"
                slides={summaryPhotos}
                className="md:max-w-[400px] max-w-[50%]"
              />
            )}
            <div className="justify-self-stretch w-full ">
              <div className="mt-4 mb-2 text-left rich-text">
                {unit.area && (
                  <p className="mb-5">
                    {unit.area}
                    <br />
                    Fully equipped
                    <br />
                    Access to homes in other locations
                  </p>
                )}
              </div>
              <Link
                href={`/unit/${unit.slug?.current}`}
                onClick={() => {
                  updateUnit(unit, unit.title)
                }}
              >
                {unit.slug && (
                  <button
                    className={classNames(
                      `relative border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center w-full h-12 max-h-12 hover:bg-black hover:text-white bg-white z-above`
                    )}
                    onClick={() => {
                      updateUnit(unit, unit.title)
                    }}
                  >
                    <span className="mb-0 py-2 text-left pl-4 uppercase">
                      {`Explore ${unit?.title}`}
                    </span>
                    <span className="py-2 pb-[0.55rem] text-[16px] text-right pr-4">
                      →
                    </span>
                  </button>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default UnitSummary
