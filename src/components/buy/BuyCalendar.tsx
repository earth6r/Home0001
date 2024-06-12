/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import { set, useForm } from 'react-hook-form'
import axios from 'axios'
import IconSmallArrow from '@components/icons/IconSmallArrow'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface BuyCalendarProps extends HTMLAttributes<HTMLFormElement> {
  email?: string
}

export const BuyCalendar: FC<BuyCalendarProps> = ({ email, className }) => {
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

  const getAvailableSlots = async () => {
    return await axios.post(`${BASE_URL}/api/available-meeting-hours`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  useEffect(() => {
    getAvailableSlots()
      .then(res => {
        // setClientSecret(res.data.clientSecret)
        const filteredSlots = res.data.data.filter(
          (days: any) => days.HasAvailability === true
        )
        setAvailableSlots(filteredSlots)
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }, [])

  const onSubmit = async (data: any) => {
    try {
      await axios.post(
        `${BASE_URL}/api/create-google-calendar_meeting`,
        {
          date: data.date,
          startTime: data.startTime,
          eventName: data.eventName,
          attendeesEmail: email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      setFormSubmitted(true)
    } catch (error) {
      setFormError({
        error: true,
        message: (error as any).response.data.message as string,
      })
      // eslint-disable-next-line no-console
      console.error(error)
      // setFormSubmitted(true)
    }
  }

  return (
    <div className={classNames(className, 'rich-text')}>
      <h2>{`Schedule closing`}</h2>
      <p>{`Available calendar slots`}</p>

      {!formSubmitted && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:max-w-[526px] h-full"
        >
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
