/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import type { ChangeEvent, FC } from 'react'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { Calendar } from '@/components/ui/calendar'
import moment from 'moment-timezone'
import { cn } from '@lib/util'
import { setUpcomingDates } from '@lib/util'
import IconChevron from '@components/icons/IconChevron'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DateSelectProps extends HTMLAttributes<HTMLFormElement> {
  availableSlots: any[]
  register: UseFormRegister<FieldValues>
  resetField?: (field: string) => void
  times?: string[]
  loading: boolean
}

const TIMES_LIST = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
]

const convertTo12HourFormat = (time24: any) => {
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
  times = TIMES_LIST,
  register,
  className,
}) => {
  const [selectedDate, setSelectedDate] = useState(moment().add(2, 'days'))
  const [hasNavigatedToNextMonth, setHasNavigatedToNextMonth] = useState(false)
  console.log('Available slots:', availableSlots[0], selectedDate)

  return (
    <div className={className}>
      {/* Hidden input to register the selected date */}
      <input
        type="hidden"
        value={selectedDate.format('YYYY-MM-DD')}
        {...register('date')}
      />

      <div className="flex flex-col justify-start gap-y min-h-[224px] lg:min-h-[167px]">
        {loading && <p className="!mx-0 mt-y text-button">{`Loading...`}</p>}

        {!loading && (
          <>
            {availableSlots && availableSlots.length > 0 ? (
              <Calendar
                mode="single"
                selected={selectedDate.toDate()}
                disabled={date => {
                  // Convert date to YYYY-MM-DD format to match availableSlots
                  const dateString = moment(date).format('YYYY-MM-DD')
                  // Disable dates that are not in availableSlots
                  return !availableSlots.some(slot => slot.date === dateString)
                }}
                onSelect={date => {
                  date && setSelectedDate(moment(date))
                }}
                onMonthChange={month => {
                  // Check if user navigated to a future month
                  const currentMonth = moment().month()
                  const currentYear = moment().year()
                  const selectedMonth = moment(month).month()
                  const selectedYear = moment(month).year()

                  if (
                    selectedYear > currentYear ||
                    (selectedYear === currentYear &&
                      selectedMonth > currentMonth)
                  ) {
                    setHasNavigatedToNextMonth(true)
                  }
                }}
                components={{
                  IconLeft: ({
                    className,
                    ...props
                  }: React.ComponentProps<'svg'>) => (
                    <ChevronLeft
                      className={classNames(
                        className,
                        hasNavigatedToNextMonth
                          ? ''
                          : 'opacity-20 pointer-events-none'
                      )}
                      {...props}
                    />
                  ),
                  IconRight: ({
                    className,
                    ...props
                  }: React.ComponentProps<'svg'>) => (
                    <ChevronRight className={className} {...props} />
                  ),
                }}
                className={classNames(
                  'flex-inline relative text-black font-sans font-regular'
                )}
              />
            ) : (
              <p className="!mx-0 mt-y text-button">{`No available times`}</p>
            )}
          </>
        )}

        <div className="w-full ml-0 md:mx-auto">
          {availableSlots &&
            availableSlots.map(
              ({ date, slots }: { date: string; slots: string[] }, index) => {
                // Format selectedDate to match the date format in availableSlots
                const selectedDateFormatted = selectedDate.format('YYYY-MM-DD')

                return (
                  selectedDateFormatted === date && (
                    <div
                      key={`slots-${index}`}
                      className={classNames('h-full')}
                    >
                      <div className="grid grid-cols-2 gap-xhalf">
                        {times?.map((time: string, index: number) => (
                          <div
                            key={index}
                            id="time-select"
                            className={classNames(
                              slots.includes(time) ? 'cursor-pointer' : '',
                              'flex items-center justify-center relative w-full h-btn font-medium'
                            )}
                          >
                            <input
                              type="radio"
                              id={time}
                              value={time}
                              className={classNames(
                                slots.includes(time) || time === '4pm'
                                  ? ''
                                  : 'disabled ',
                                'background-checkbox'
                              )}
                              required
                              {...register('startTime')}
                            />
                            <label
                              htmlFor={time}
                              className="relative cursor-pointer pointer-events-none z-above"
                            >
                              {`${convertTo12HourFormat(time)} EST`}
                            </label>
                          </div>
                        ))}

                        {/* {slots?.map((time: string, index: number) => (
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
                            {`${convertTo12HourFormat(time)} EST`}
                          </label>
                        </div>
                      ))} */}
                      </div>
                    </div>
                  )
                )
              }
            )}
        </div>
      </div>
    </div>
  )
}

export default DateSelect
