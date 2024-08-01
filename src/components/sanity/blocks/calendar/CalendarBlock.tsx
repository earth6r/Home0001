/* eslint-disable no-console */
import { useEffect, useState, type FC } from 'react'
import classNames from 'classnames'
import type { CalendarBlock as CalendarBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import {
  Block,
  RichText,
  bookPhoneCall,
  getAvailableSlots,
} from '@components/sanity'
import { DateSelect } from '@components/date-select'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import 'react-phone-number-input/style.css'

type CalendarBlockProps = Omit<SanityBlockElement, keyof CalendarBlockType> &
  CalendarBlockType

export const CalendarBlock: FC<CalendarBlockProps> = ({
  index,
  header,
  successMessage,
  className,
}) => {
  const {
    register,
    handleSubmit,
    resetField,
    control,
    formState: { errors },
  } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState<{
    error: boolean | null
    message: string
  }>({ error: null, message: '' })

  const [availableSlots, setAvailableSlots] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const onSubmit = async (data: FieldValues) => {
    if (!data.email || !data.startTime) return
    setIsSubmitting(true)
    bookPhoneCall(data)
      .then(() => {
        setFormSubmitted(true)
        setIsSubmitting(false)
      })
      .catch((err: any) => {
        setFormError({
          error: true,
          message: (err as any).response.data.message as string,
        })
        console.error(err)
        setIsSubmitting(false)
      })
  }

  useEffect(() => {
    getAvailableSlots()
      .then((res: any) => {
        const filteredSlots = res?.data?.data?.filter(
          (days: any) => days.HasAvailability === true
        )
        setAvailableSlots(filteredSlots)
        setLoading(false)
      })
      .catch((err: any) => {
        console.log(err)
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <Block className={classNames(className)}>
      {header && (
        <RichText blocks={header} className="mb-y text-left md:text-center" />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 relative w-[calc(100%+var(--space-x)*2)] min-h-[660px] -left-x bg-yellow py-ydouble px-x">
        <div className="md:col-start-2">
          {!formSubmitted && (
            <form
              id={`calendar-block-${index}`}
              onSubmit={handleSubmit(onSubmit)}
              className="w-full md:max-w-[526px] md:mx-auto h-full"
            >
              <div className="rich-text mb-y">
                <p className="uppercase">What time works best?</p>
              </div>

              <DateSelect
                availableSlots={availableSlots}
                register={register}
                resetField={resetField}
                loading={loading}
                className="mb-y"
              />

              <div className="mb-y">
                <p className="uppercase font-medium small">
                  <span className="block small">
                    Meeting Duration: 15 minutes
                  </span>
                </p>
              </div>

              <div className={classNames('flex flex-row gap-y mb-y')}>
                <input
                  type="text"
                  id="first_name"
                  className="input"
                  placeholder="FIRST NAME"
                  required
                  {...register('first_name', { required: 'Name required' })}
                />
                <input
                  type="text"
                  id="last_name"
                  className="input"
                  placeholder="LAST NAME"
                  required
                  {...register('last_name', { required: 'Name required' })}
                />
              </div>

              <input
                placeholder={'YOUR EMAIL'}
                type="email"
                id="email"
                className="input mb-y"
                required
                {...register('email')}
              />

              <Controller
                control={control}
                rules={{
                  validate: (value = '') => isValidPhoneNumber(value),
                }}
                {...register('phone')}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    value={value}
                    onChange={onChange}
                    defaultCountry="US"
                    placeholder="PHONE NUMBER"
                    id="phone"
                    className="input mb-y"
                  />
                )}
              />
              {errors.phone && (
                <p className="mb-y text-button">Invalid Phone Number</p>
              )}

              <textarea
                placeholder={`Anything specific you'd like to discuss on the call?`}
                id="notes"
                className="input textarea mb-y"
                {...register('notes')}
              />

              <button
                className="relative flex justify-between items-center w-full px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
                type="submit"
                form={`calendar-block-${index}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Book a call'}
                <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
              </button>

              {formError.error && (
                <p className="text-red mt-y font-medium uppercase">
                  {formError.message ||
                    `Meeting creation failed, please try again`}
                </p>
              )}
            </form>
          )}

          {formSubmitted && (
            <>
              {successMessage ? (
                <RichText blocks={successMessage} className="relative" />
              ) : (
                <div className="relative">
                  <p className="font-medium uppercase">{`Your call with HOME0001 is scheduled.`}</p>
                  <p className="font-medium mt-y">
                    {`Please check your email for event details.`}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Block>
  )
}

export default CalendarBlock
