/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import type { ChangeEvent, FC } from 'react'
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import IconChevron from '@components/icons/IconChevron'

interface DateSelectProps extends HTMLAttributes<HTMLFormElement> {
  availableSlots: any[]
  register: UseFormRegister<FieldValues>
  loading: boolean
}

export const DateSelect: FC<DateSelectProps> = ({
  availableSlots,
  loading,
  register,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(availableSlots[0]?.date)

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
            {availableSlots && availableSlots.length > 0 ? (
              <select
                className="input"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setActiveIndex(e.target.value)
                }
              >
                {availableSlots
                  .slice(0, 14)
                  .map(({ date }: { date: string; slots: string[] }, index) => {
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
                        id={date}
                        value={date}
                        {...register('date')}
                      >
                        <span className="text-button">{formattedDate}</span>
                      </option>
                    )
                  })}
              </select>
            ) : (
              <p className="!mx-0 mt-y text-button">{`No available times`}</p>
            )}
          </>
        )}

        <div className="w-full ml-0 md:mx-auto">
          {availableSlots.map(
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
                        className="flex items-center justify-center relative w-full h-btn cursor-pointer"
                      >
                        <input
                          type="radio"
                          id={time}
                          value={time}
                          className="background-checkbox"
                          {...register('startTime')}
                          onClick={() => {
                            const dateEl = document.getElementById(date)
                            if (dateEl) {
                              dateEl.click()
                            }
                          }}
                        />
                        <label
                          htmlFor={time}
                          className="relative cursor-pointer pointer-events-none z-above"
                        >
                          {time}
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
