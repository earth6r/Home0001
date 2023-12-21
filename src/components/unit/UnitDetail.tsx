import { type FC, memo } from 'react'
import { ImageCarousel } from '@components/carousel'
import { RichText } from '@components/sanity'
import { UnitElProps } from './types'
import classNames from 'classnames'
import SanityTableModal from '@components/sanity/table-modal/SanityTableModal'
import { IconSmallArrow } from '@components/icons/IconSmallArrow'
import { Accordion } from '@components/accordion'
import { useInquiryModal } from '@contexts/modals'
import DetailsDropdown from './DetailsDropdown'

export const UnitDetailComponent: FC<UnitElProps> = ({
  unit,
  accordions,
  className,
}) => {
  const [inquiryModal, setInquiryOpen] = useInquiryModal()

  return (
    <div className={classNames(className, 'overflow-x-hidden')}>
      <div className="md:grid md:grid-cols-3 px-x md:pr-0">
        <div className="md:col-start-1 col-start-2 md:col-span-3">
          <div className="flex flex-col relative">
            {unit?.photographs && unit?.photographs.length > 0 && (
              <ImageCarousel
                index="0"
                slides={unit?.photographs}
                carousel={true}
                className="relative w-full mb-yhalf"
                placement="unit images"
              />
            )}

            <h2 className="text-xl font-bold mb-0 uppercase col-span-2">
              {unit?.title}
            </h2>
            <div className="pr-menu md:pr-0 mb-ydouble md:mb-y text-md font-bold">
              <p className="m-0">
                {unit?.price == 'Inquire' ? 'Price upon request' : unit?.price}
              </p>
              {unit?.area && <p className="mb-ylg">{unit?.area}</p>}

              {unit?.summary && (
                <>
                  <p className="uppercase font-bold mb-y">Overview</p>
                  <RichText
                    blocks={unit?.summary}
                    className="max-w-[500px] underlined"
                  />
                </>
              )}

              {unit?.factSheet?.rows && (
                <SanityTableModal
                  table={unit.factSheet}
                  modalType="View Fact Sheet"
                  className="inline-block text-md font-bold"
                  unit={unit.title}
                />
              )}
            </div>

            {unit?.unitDetails && (
              <>
                <p className="uppercase font-bold text-md mb-y">Details</p>
                <DetailsDropdown details={unit?.unitDetails} />
              </>
            )}
          </div>

          {unit?.layoutImages && unit?.layoutImages.length > 0 && (
            <>
              <p className="uppercase text-md font-bold mb-y">Plans</p>
              <ImageCarousel
                index="1"
                carousel={true}
                slides={unit?.layoutImages}
                className="w-full mb-ylg"
                placement="unit layouts"
              />
            </>
          )}

          <div className="pr-menu md:pr-0 mb-yhalf md:max-w-[346px]">
            <a href="mailto:totest@test.com">
              <button
                className={classNames(
                  'w-full relative border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center h-12 max-h-12 bg-black text-white text-xs uppercase font-medium tracking-tight z-above p-4'
                )}
              >
                {`Schedule a tour for this home`}
                <IconSmallArrow width="16" height="10" />
              </button>
            </a>
          </div>

          <div className="pr-menu md:pr-0 mb-ydouble md:max-w-[346px]">
            <a href="mailto:totest@test.com">
              <button
                className={classNames(
                  'w-full relative border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center h-12 max-h-12 bg-white text-black text-xs uppercase font-medium z-above p-4'
                )}
              >
                {`Inquire`}
                <IconSmallArrow width="16" height="10" fill="black" />
              </button>
            </a>
          </div>

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

export const UnitDetail = memo(UnitDetailComponent)

export default UnitDetail
