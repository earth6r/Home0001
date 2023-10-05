import { type FC, useContext, useState, useEffect, useRef } from 'react'
import { HomeContext } from '@contexts/home'
import { ImageCarousel } from '@components/carousel'
import { RichText } from '@components/sanity'
import { UnitElProps } from './types'
import classNames from 'classnames'
import Link from 'next/link'
import { BtnScrollToTop } from '@components/btns/BtnScrollToTop'
import { HubspotForm } from '@components/form'
import { scrollToEl, sendGoogleEvent, sendHubspotEvent } from '@lib/util'
import { AccordionModal } from '@components/accordion'
// import { FactSheet } from '@components/fact-sheet'
import { SanityTable } from '@components/sanity/table'

export const Unit: FC<UnitElProps> = ({ accordions, className }) => {
  const { state } = useContext(HomeContext)
  const unit = state.unit
  const formRef = useRef(null)
  const [formActive, setFormActive] = useState(false)

  const formButtonClick = () => {
    setFormActive(!formActive)
    if (!unit?.title) return
    sendGoogleEvent(`opened_reserve_form_for_${unit?.title}`)
    sendHubspotEvent('clicked reserve this home', unit?.title)
  }

  useEffect(() => {
    if (formRef.current) scrollToEl(formRef.current)
  }, [formActive])

  return (
    <div className={className}>
      <div className="md:grid md:grid-cols-3 md:pr-menu">
        <div className="md:col-start-2 md:col-span-1">
          <div className="flex flex-col relative mt-10">
            {unit?.photographs && unit?.photographs.length > 0 && (
              <ImageCarousel slides={unit?.photographs} className="w-full" />
            )}

            <div className="mt-10">
              {unit?.propertyType && (
                <p className="m-0 uppercase tracking-caps">
                  <span>{unit?.propertyType.typeTitle}</span>
                  <span>&nbsp;—&nbsp;</span>
                  <span>{unit?.title}</span>
                </p>
              )}
            </div>
            <div className="pr-menu md:pr-0">
              <p className="m-0">
                {unit?.price == 'Inquire' ? 'Price upon request' : unit?.price}
              </p>
              {unit?.area && <p className="mb-4">{unit?.area}</p>}
              {unit?.details && <RichText blocks={unit?.details} />}
            </div>
          </div>

          {/* <FactSheet unit={unit} className="pr-menu md:pr-0" /> */}
          {unit?.factSheet?.rows && (
            <SanityTable table={unit.factSheet} className="pr-menu md:pr-0" />
          )}

          {unit?.layoutImages && unit?.layoutImages.length > 0 && (
            <ImageCarousel slides={unit?.layoutImages} className="w-full" />
          )}

          {unit?.moreInfo && (
            <div className="mt-10 pr-menu md:pr-0">
              <RichText blocks={unit?.moreInfo} />
            </div>
          )}

          {accordions && <AccordionModal accordions={accordions} />}

          <div className="pr-menu md:pr-0">
            <button
              onClick={() => formButtonClick()}
              className={classNames(
                formActive ? 'bg-white text-black' : 'bg-black text-white',
                'my-9 text-center uppercase block w-full h-12 max-h-12 py-2 px-3 border border-solid border-[#000]'
              )}
            >
              {`Reserve this home`}
            </button>
          </div>
        </div>
      </div>

      {formActive ? (
        <div
          ref={formRef}
          className="md:grid md:grid-cols-3 relative pr-10 md:pr-menu animate-fadeIn opacity-0"
        >
          <div className="w-screen h-full -ml-4 md:-ml-10 absolute bg-whitesmoke z-behind"></div>
          <div className="md:col-start-2 md:col-span-1 py-12 z-above">
            {unit?.title && (
              <div className="rich-text pb-4">
                <h2 className="pb-9 uppercase">{`Join the waitlist for ${unit?.title}`}</h2>

                <p className="m-0">
                  {`${unit?.title} will be released for sale soon to buyers on the waitlist. Homebuyers will be offered this home in the order they joined.`}
                </p>

                <p>
                  {`Once you receive an offer, you can secure it with a small deposit and will have the chance to spend a few nights in the property to see how it feels before going ahead with the purchase. The Home0001 team will be available to answer questions, help secure financing, etc.`}
                </p>

                <p>{`Join the waitlist for ${unit?.title} here:`}</p>
              </div>
            )}

            <HubspotForm formType="unit" />
          </div>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-3 pr-menu">
          <div className="md:col-start-2 md:col-span-1 rich-text">
            <p>
              {`Not the home for you? `}
              <Link href="/newsletter" className="border-bottom">
                {`Sign up here`}
              </Link>
              {` for updates on new buildings in new locations.`}
            </p>
            <BtnScrollToTop className="mt-9" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Unit
