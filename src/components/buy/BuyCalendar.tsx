/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { createGoogleCalendarMeeting, getAvailableSlots } from './actions'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface BuyCalendarProps extends HTMLAttributes<HTMLFormElement> {
  email?: string
  unit?: string
}

export const BuyCalendar: FC<BuyCalendarProps> = ({
  email,
  unit,
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
  const [revealedTimes, setRevealedTimes] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const onSubmit = async (data: any) => {
    if (!email || !unit) return
    const additionalEmails = data.additionalEmails.split(',')
    createGoogleCalendarMeeting(data, email, unit, additionalEmails)
      .then(res => {
        console.log(res)
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
        console.log(filteredSlots)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className={classNames(className, 'rich-text')}>
      <h2>{`Schedule closing`}</h2>
      <p>{`Available calendar slots`}</p>

      {!formSubmitted && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:max-w-[526px] h-full"
        >
          <div className="flex flex-col justify-start gap-y mb-ydouble">
            {loading && <p className="!mx-0 mt-y">{`Loading...`}</p>}

            {availableSlots.map(
              ({ date, slots }: { date: string; slots: string[] }, index) => (
                <div key={index} className="flex flex-col justify-start gap-y">
                  <div className="flex gap-0">
                    <input
                      type="radio"
                      id={date}
                      value={date}
                      {...register('date')}
                      onChange={() => setRevealedTimes(index)}
                    />
                    <label htmlFor={date}>{date}</label>
                  </div>

                  {revealedTimes === index && (
                    <div className="flex flex-wrap gap-xhalf">
                      {slots?.map((time: string, index: number) => (
                        <div key={index} className="flex gap-0">
                          <input
                            type="radio"
                            id={time}
                            value={time}
                            {...register('startTime')}
                          />
                          <label htmlFor={time}>{time}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}

            <input
              type="email"
              className="input"
              placeholder="Additional emails (comma separated)"
              multiple
              {...register('additionalEmails')}
            />
          </div>

          <button
            className="relative flex justify-between items-center w-full md:w-btnWidth px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
            type={'submit'}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Schedule time'}
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
          <p className="font-medium uppercase">{`Meeting created`}</p>
        </div>
      )}
    </div>
  )
}

export default BuyCalendar
