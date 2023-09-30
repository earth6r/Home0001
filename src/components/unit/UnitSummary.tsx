import { type FC, useContext } from 'react'
import { HomeContext } from '@contexts/home'
import classNames from 'classnames'
import { KeyedUnit, UnitListProps } from './types'
import slugify from 'slugify'
import { useRouter } from 'next/router'
import { sendGoogleEvent, sendHubspotEvent } from '@lib/util'

export const UnitSummary: FC<UnitListProps> = ({ unit }) => {
  const router = useRouter()
  const { dispatch, state } = useContext(HomeContext)

  const dispatchUnit = (unit: KeyedUnit, title?: string) => {
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

  const updateUnit = (unit: KeyedUnit, title?: string) => {
    if (unit._id === state.unit?._id) return
    const slugifiedTitle = title && slugify(title, { lower: true })
    dispatchUnit(unit, slugifiedTitle)
    updatePath(slugifiedTitle)

    if (unit.title) {
      sendGoogleEvent(`clicked_unit_tile_for_${unit.title}`)
      sendHubspotEvent('tile clicked', unit.title)
    }
  }

  if (!unit) return null
  return (
    <li>
      <button
        disabled={!unit?.available}
        onClick={() => updateUnit(unit, unit.title)}
        className={`transition-colors disabled:opacity-30 disabled:bg-white disabled:shadow-none px-4 pt-4 pb-0 min-h-[16rem] w-full grid justify-stretch flex-col`}
      >
        {/* TODO: replace */}
        <div className="w-full h-[300px] bg-[lightgray] mb-5"></div>
        {/* <img
          className="h-auto w-auto mb-5"
          src={}
          height="487"
          width="560"
          alt="apartment preview image"
        /> */}
        <div className="justify-self-stretch w-full">
          <div className="grid">
            <p className="col-start-1 text-left uppercase">
              {unit.propertyType && (
                <span>{unit?.propertyType?.typeTitle}</span>
              )}
              <span>&nbsp;—&nbsp;</span>
              {unit.title && <span>{unit.title}</span>}
            </p>
            <p className="col-start-2 text-right">{unit.price}</p>
          </div>
          <div className="mt-4 mb-2 text-left">
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
          <div
            className={classNames(
              state.unit?._id === unit._id ? 'bg-black text-white' : '',
              `border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center h-12 max-h-12`
            )}
          >
            <p className="mb-0 py-2 text-left pl-4 uppercase">
              {state.unit?._id === unit._id
                ? 'Selected'
                : `Explore ${unit?.title}`}
            </p>
            <p className=" py-2 pb-[0.55rem] text-[16px] text-right pr-4">→</p>
          </div>
        </div>
      </button>
    </li>
  )
}

export default UnitSummary
