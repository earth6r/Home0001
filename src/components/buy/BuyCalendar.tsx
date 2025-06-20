/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { createGoogleCalendarMeeting, getAvailableSlots } from './actions'

import { saveError } from '@lib/util/save-error'
import { DateSelect } from '@components/date-select'

interface BuyCalendarProps extends HTMLAttributes<HTMLFormElement> {
  email?: string
  unit?: string
  calendarDate?: string
  onMeetingSet?: () => void
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
        if (onMeetingSet) onMeetingSet()
        setFormSubmitted(true)
      })
      .catch(err => {
        setFormError({
          error: true,
          message: (err as any).response.data.message as string,
        })
        console.error(err)
        saveError(err, 'createGoogleCalendarMeeting')
      })
  }

  useEffect(() => {
    getAvailableSlots()
      .then(res => {
        const filteredSlots = res?.data.data.filter(
          (days: any) => days.HasAvailability === true
        )
        setAvailableSlots(filteredSlots)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className={classNames(className)}>
      {!calendarDate && !formSubmitted && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
          <DateSelect
            availableSlots={availableSlots}
            register={register}
            loading={loading}
            className="mb-y"
          />

          <button
            className="inline-flex justify-between items-center gap-[4px] relative px-[6px] pt-[3px] pb-[4px] mt-yhalf bg-black text-white font-medium text-left uppercase text-xs z-above"
            type={'submit'}
            disabled={isSubmitting}
          >
            <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
            {isSubmitting ? 'Submitting...' : 'Make appointment'}
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
