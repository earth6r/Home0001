import { type FC, useState, useEffect, useRef, memo } from 'react'
import { ImageCarousel } from '@components/carousel'
import { RichText } from '@components/sanity'
import { UnitElProps } from './types'
import classNames from 'classnames'
import Link from 'next/link'
import { BtnScrollToTop } from '@components/btns/BtnScrollToTop'
import { Form, SinglePaneInputs } from '@components/form'
import { scrollToEl, sendGoogleEvent, sendHubspotEvent } from '@lib/util'
import { AccordionModal } from '@components/accordion'
import SanityTableModal from '@components/sanity/table-modal/SanityTableModal'
import { useForm } from 'react-hook-form'
import { Accordion } from '@components/accordion'
import { useWaitlisModal } from '@contexts/modals'

const UNIT_AUDIENCE_ID = process.env.NEXT_PUBLIC_HUBSPOT_UNIT_WAITLIST_ID

export const UnitComponent: FC<UnitElProps> = ({
  unit,
  accordions,
  className,
}) => {
  const [waitlistModal, setWaitlistModal] = useWaitlisModal()
  const formRef = useRef(null)
  const [formActive, setFormActive] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })
  const formButtonClick = () => {
    setFormActive(!formActive)
    if (!unit?.title) return
    // sendGoogleEvent(`opened_reserve_form_for_${unit?.title}`)
    // sendHubspotEvent('clicked reserve this home', unit?.title)
  }

  useEffect(() => {
    if (formRef.current) scrollToEl(formRef.current)
  }, [formActive])

  return (
    <div className={className}>
      <div className="md:grid md:grid-cols-3 md:pr-menu px-x">
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
              {unit?.summary && <RichText blocks={unit?.summary} />}
              {unit?.factSheet?.rows && (
                <SanityTableModal
                  table={unit.factSheet}
                  modalType="View Fact Sheet"
                  className="inline-block"
                />
              )}
            </div>

            {unit?.unitDetails &&
              unit.unitDetails.length > 0 &&
              unit.unitDetails.map(({ _key, header, text }) => (
                <Accordion
                  key={_key}
                  header={header}
                  text={text}
                  className="mt-2 mb-8 border-x-0 border-t-0"
                />
              ))}
          </div>

          {unit?.layoutImages && unit?.layoutImages.length > 0 && (
            <ImageCarousel slides={unit?.layoutImages} className="w-full" />
          )}

          {unit?.moreInfo && (
            <div className="mt-10 pr-menu md:pr-0">
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
                className="mt-2 mb-8 border-x-0 border-t-0"
              />
            ))}
          <div className="pr-menu md:pr-0">
            <button
              onClick={() => setWaitlistModal(true)}
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
    </div>
  )
}

export const Unit = memo(UnitComponent)

export default Unit
