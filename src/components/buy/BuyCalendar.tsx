/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { HTMLAttributes, memo, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import {
  createGoogleCalendarMeeting,
  getAvailableSlots,
  updateGoogleCalendarMeeting,
} from './actions'

import { saveError } from '@lib/util/save-error'
import { DateSelect } from '@components/date-select'
import moment from 'moment-timezone'
import { ArrowBtn } from '@components/btns'

const createEasternTimeDate = (
  dateStr: string,
  timeStr: string
): { start: string; end: string } => {
  const dateTimeString = `${dateStr} ${timeStr}`
  const easternTime = moment.tz(
    dateTimeString,
    'YYYY-MM-DD HH:mm',
    'America/New_York'
  )

  return {
    start: easternTime.toISOString(),
    end: easternTime.clone().add(1, 'hour').toISOString(),
  }
}

interface BuyCalendarProps extends HTMLAttributes<HTMLFormElement> {
  email?: string
  unit?: string
  eventId?: string | null
  onMeetingSet?: () => void
}

export const BuyCalendarComponent: FC<BuyCalendarProps> = ({
  email,
  unit,
  eventId,
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
    if (!email || !data) return

    console.log('Submitting calendar meeting with data:', email, data)

    const { start, end } = createEasternTimeDate(data.date, data.startTime)

    if (eventId) {
      updateGoogleCalendarMeeting(eventId, start, end, email)
        .then(res => {
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
    } else {
      createGoogleCalendarMeeting(start, end, email)
        .then(res => {
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
      {!formSubmitted && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
          <DateSelect
            availableSlots={availableSlots}
            register={register}
            loading={loading}
            className="mb-y"
          />

          <ArrowBtn
            type="submit"
            text={isSubmitting ? 'Submitting...' : 'Make appointment'}
            disabled={isSubmitting}
            className="mt-yhalf z-above"
          />

          {formError.error && (
            <p className="text-[#FF0000] mt-y font-medium uppercase">
              {formError.message || `Meeting creation failed, please try again`}
            </p>
          )}
        </form>
      )}

      {formSubmitted && (
        <div className="relative mt-y mb-2">
          <p className="font-medium uppercase">{`Session time submitted`}</p>
        </div>
      )}
    </div>
  )
}

export const BuyCalendar = memo(BuyCalendarComponent)

export default BuyCalendar
