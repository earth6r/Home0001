/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { HTMLAttributes, useRef } from 'react'
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
  const slidesRef = useRef(null)
  return (
    <div className={className}>
      <div className="flex flex-col justify-start gap-y">
        {loading && <p className="!mx-0 mt-y">{`Loading...`}</p>}

        <Swiper
          ref={slidesRef}
          modules={[Navigation]}
          loop={false}
          spaceBetween={16}
          speed={600}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
          }}
          className={classNames(
            'calendar w-full ml-0 md:mx-auto overflow-hidden cursor-grab'
          )}
        >
          {availableSlots.map(
            ({ date, slots }: { date: string; slots: string[] }, index) => {
              const formattedDate = new Date(date).toLocaleDateString('en-US', {
                timeZone: 'UTC',
                weekday: 'short',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })

              return (
                <SwiperSlide key={index} className="block h-full">
                  <div className="mb-y">
                    <input
                      type="radio"
                      id={date}
                      value={date}
                      className="!hidden"
                      {...register('date')}
                    />
                    <label htmlFor={date} className="text-button">
                      {formattedDate}
                    </label>
                  </div>

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
                </SwiperSlide>
              )
            }
          )}
          <div
            className={classNames(
              'flex absolute top-0 right-0 transition-opacity duration-200 pointer-events-none z-above'
            )}
          >
            <div className="p-x transform -translate-y-1/3 swiper-prev pointer-events-auto cursor-pointer">
              <IconChevron
                width="13"
                fill="black"
                className={classNames('rotate-180')}
              />
            </div>
            <div className="p-x transform -translate-y-1/3 swiper-next pointer-events-auto cursor-pointer">
              <IconChevron
                width="13"
                fill="black"
                className={classNames('relative')}
              />
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  )
}

export default DateSelect
