/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import type { ChangeEvent, FC } from 'react'
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import IconChevron from '@components/icons/IconChevron'
import { Icon } from '@chakra-ui/react'

interface DateSelectProps extends HTMLAttributes<HTMLFormElement> {
  availableSlots: any[]
  register: UseFormRegister<FieldValues>
  loading: boolean
}

function convertTo12HourFormat(time24: any) {
  // Split the time into hours and minutes
  let [hours, minutes] = time24.split(':').map(Number)

  // Determine AM or PM
  let period = hours >= 12 ? 'PM' : 'AM'

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12 || 12 // Converts '0' or '12' to '12'

  // Construct the 12-hour time string
  let time12 = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`

  return time12
}

export const DateSelect: FC<DateSelectProps> = ({
  availableSlots,
  loading,
  register,
  className,
}) => {
  //@ts-ignore
  const [activeIndex, setActiveIndex] = useState(availableSlots?.[0]?.date)
  const renderedSlots = availableSlots

  useEffect(() => {
    if (availableSlots && availableSlots.length > 0) {
      setActiveIndex(availableSlots[0]?.date)
    }
  }, [availableSlots])

  return (
    <div className={className}>
      <div className="flex flex-col justify-start gap-y">
        {loading && <p className="!mx-0 mt-y text-button">{`Loading...`}</p>}

        {!loading && (
          <>
            {renderedSlots && renderedSlots.length > 0 ? (
              <div className="relative">
                <select
                  id="date-select"
                  className="input select text-button font-sans"
                  {...register('date')}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setActiveIndex(e.target.value)
                  }}
                >
                  {renderedSlots
                    .slice(0, 14)
                    .map(
                      ({ date }: { date: string; slots: string[] }, index) => {
                        const formattedDate = new Date(date).toLocaleDateString(
                          'en-US',
                          {
                            timeZone: 'UTC',
                            weekday: 'short',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )

                        return (
                          <option
                            key={`option-${index}`}
                            id="date-select"
                            value={date}
                          >
                            <span className="text-button">{formattedDate}</span>
                          </option>
                        )
                      }
                    )}
                </select>
                <IconChevron className="absolute w-[12px] right-x top-1/2 transform rotate-90 -translate-y-1/2" />
              </div>
            ) : (
              <p className="!mx-0 mt-y text-button">{`No available times`}</p>
            )}
          </>
        )}

        <div className="w-full ml-0 md:mx-auto">
          {renderedSlots &&
            renderedSlots.map(
              ({ date, slots }: { date: string; slots: string[] }, index) => {
                return (
                  <div
                    key={`slots-${index}`}
                    className={classNames(
                      activeIndex === date ? 'block' : 'hidden',
                      'h-full'
                    )}
                  >
                    <div className="grid grid-cols-3 gap-xhalf">
                      {slots?.map((time: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-center relative w-full h-btn cursor-pointer font-medium"
                        >
                          <input
                            type="radio"
                            id={time}
                            value={time}
                            className="background-checkbox"
                            {...register('startTime')}
                          />
                          <label
                            htmlFor={time}
                            className="relative cursor-pointer pointer-events-none z-above"
                          >
                            {convertTo12HourFormat(time)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
            )}
        </div>
      </div>
    </div>
  )
}

export default DateSelect
