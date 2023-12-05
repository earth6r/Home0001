import { type FC, memo } from 'react'
import { ImageCarousel } from '@components/carousel'
import { RichText } from '@components/sanity'
import { UnitElProps } from './types'
import classNames from 'classnames'
import SanityTableModal from '@components/sanity/table-modal/SanityTableModal'
import { IconSmallArrow } from '@components/icons/IconSmallArrow'
import { Accordion } from '@components/accordion'
import { useWaitlisModal } from '@contexts/modals'

export const UnitComponent: FC<UnitElProps> = ({
  unit,
  accordions,
  className,
}) => {
  const [waitlistModal, setWaitlistModal] = useWaitlisModal()

  return (
    <div className={classNames(className, 'overflow-x-hidden')}>
      <div className="md:grid md:grid-cols-3 px-x md:pr-0">
        <h2 className="text-xl font-bold mb-12 uppercase col-span-2">
          {unit?.title}
        </h2>
        <div className="md:col-start-1 col-start-2 md:col-span-3">
          <div className="flex flex-col relative">
            {unit?.photographs && unit?.photographs.length > 0 && (
              <ImageCarousel
                index="0"
                slides={unit?.photographs}
                carousel={true}
                className="relative w-full"
              />
            )}

            <div className="text-xs font-medium">
              {unit?.propertyType && (
                <p className="mt-4 uppercase tracking-details">
                  <span>{unit?.title}</span>
                </p>
              )}
            </div>
            <div className="pr-menu md:pr-0 mb-ydouble md:mb-y text-xs font-medium">
              <p className="m-0">
                {unit?.price == 'Inquire' ? 'Price upon request' : unit?.price}
              </p>
              {unit?.area && <p className="mb-4">{unit?.area}</p>}
              {unit?.factSheet?.rows && (
                <SanityTableModal
                  table={unit.factSheet}
                  modalType="View Fact Sheet"
                  className="inline-block"
                />
              )}
              {unit?.summary && (
                <RichText blocks={unit?.summary} className="max-w-[500px]" />
              )}
            </div>

            {unit?.unitDetails &&
              unit.unitDetails.length > 0 &&
              unit.unitDetails.map(({ _key, header, text }) => (
                <Accordion
                  key={_key}
                  header={header}
                  text={text}
                  className="mb-ydouble md:mb-y mr-menu md:mr-0 md:max-w-[346px] border-x-0 border-t-0 font-bold text-xs"
                />
              ))}

            <div className="pr-menu md:pr-0 mb-ydouble md:mb-y md:max-w-[346px]">
              <button
                onClick={() => setWaitlistModal(true)}
                className={classNames(
                  'bg-black text-white',
                  'w-full relative border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center h-12 max-h-12 bg-black text-white text-xs uppercase font-medium z-above p-4'
                )}
              >
                {`Inquire`}
                <IconSmallArrow width="22" height="10" />
              </button>
            </div>
          </div>

          {unit?.layoutImages && unit?.layoutImages.length > 0 && (
            <ImageCarousel
              index="1"
              carousel={true}
              slides={unit?.layoutImages}
              className="w-full"
            />
          )}

          {unit?.moreInfo && (
            <div className="mt-10 pr-menu">
              <RichText blocks={unit?.moreInfo} />
            </div>
          )}

          {unit?.secondUnitDetails &&
            unit.secondUnitDetails.length > 0 &&
            unit.secondUnitDetails.map(({ _key, header, text }) => (
              <Accordion
                key={_key}
                header={header}
                text={text}
                location={{ property: 'property', unit: 'unit' }}
                className="mt-2 mb-8 border-x-0 border-t-0"
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export const Unit = memo(UnitComponent)

export default Unit
