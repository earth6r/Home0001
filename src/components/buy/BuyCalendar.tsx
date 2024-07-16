/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { createGoogleCalendarMeeting, getAvailableSlots } from './actions'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import IconChevron from '@components/icons/IconChevron'
import { DateSelect } from '@components/date-select'

interface BuyCalendarProps extends HTMLAttributes<HTMLFormElement> {
  email?: string
  unit?: string
  calendarDate?: string
  onMeetingSet: () => void
}

export const BuyCalendar: FC<BuyCalendarProps> = ({
  email,
  unit,
  calendarDate,
  onMeetingSet,
  className,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState<{
    error: boolean | null
    message: string
  }>({ error: null, message: '' })

  const [availableSlots, setAvailableSlots] = useState([])
  const [loading, setLoading] = useState(true)

  const onSubmit = async (data: any) => {
    if (!email || !unit) return
    createGoogleCalendarMeeting(data, email, unit)
      .then(res => {
        console.log(res)
        onMeetingSet()
        setFormSubmitted(true)
      })
      .catch(err => {
        setFormError({
          error: true,
          message: (err as any).response.data.message as string,
        })
        console.error(err)
      })
  }

  useEffect(() => {
    getAvailableSlots()
      .then(res => {
        const filteredSlots = res.data.data.filter(
          (days: any) => days.HasAvailability === true
        )
        setAvailableSlots(filteredSlots)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className={classNames(className, 'px-x py-ydouble md:mx-x bg-yellow')}>
      <div className="rich-text">
        {calendarDate ? (
          <div className="mt-ydouble">
            <span className="inline-block mb-y text-md uppercase font-sansText">{`Your buying session has been requested for:`}</span>
            <h2 className="text-h2">{`${calendarDate}`}</h2>
          </div>
        ) : (
          <>
            <h2 className="mb-ydouble text-h2">
              STEP 1: <br />
              SCHEDULE YOUR HOMEBUYING session.
            </h2>

            <p>
              You should have now received the documents that you will need to
              sign in order to buy your home.
            </p>
            <p>
              You’ll be able to sign these documents electronically with an
              online notary in your single-session homebuying video call. Right
              before your video call, another notary will visit you at your
              home, work, or wherever is convenient for you to sign your
              mortgage papers.
            </p>
          </>
        )}

        <p className="text-button">WHAT DO YOU NEED?</p>

        <div className="inline-block mt-ydouble">
          <li>
            {`Your government-issued photo ID such as a driver’s license or
            passport.`}
          </li>

          <li>
            {`A computer / mobile device with audio/video and Google Chrome
            browser.`}
          </li>

          <li>{`A strong internet connection (for the video meeting).`}</li>
        </div>
      </div>

      {!calendarDate && !formSubmitted && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:max-w-[526px] h-full mt-ydouble"
        >
          <DateSelect
            availableSlots={availableSlots}
            register={register}
            loading={loading}
            className="mb-ydouble"
          />

          <button
            className="relative flex justify-between items-center w-full md:w-btnWidth max-w-full px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
            type={'submit'}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Book my homebuying session'}
            <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
          </button>

          {formError.error && (
            <p className="text-red mt-y font-medium uppercase">
              {formError.message || `Meeting creation failed, please try again`}
            </p>
          )}
        </form>
      )}

      {formSubmitted && (
        <div className="relative mt-ydouble mb-2">
          <p className="font-medium uppercase">{`Session time submitted`}</p>
        </div>
      )}
    </div>
  )
}

export default BuyCalendar
