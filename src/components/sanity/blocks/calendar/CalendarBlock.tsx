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
import { useForm } from 'react-hook-form'
import IconSmallArrow from '@components/icons/IconSmallArrow'

type CalendarBlockProps = Omit<SanityBlockElement, keyof CalendarBlockType> &
  CalendarBlockType

export const CalendarBlock: FC<CalendarBlockProps> = ({
  header,
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
    console.log('onSubmit: ', data)
    if (!data.email) return
    bookPhoneCall(data)
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
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <Block className={classNames(className, '')}>
      {header && <RichText blocks={header} className="mb-y text-left" />}

      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="bg-yellow pb-y px-x">
          {!formSubmitted && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full md:max-w-[526px] h-full mt-y"
            >
              <div className="rich-text mb-y">
                <p className="uppercase">What time works best?</p>
              </div>

              <DateSelect
                availableSlots={availableSlots}
                register={register}
                loading={loading}
                className="mb-yhalf"
              />

              <div className="mb-ydouble">
                <p className="uppercase font-medium small">
                  <span className="block small">
                    Meeting Duration: 15 minutes
                  </span>
                  <span className="block small">All times in EST</span>
                </p>
              </div>

              <div className={classNames('flex flex-row gap-y mb-y')}>
                <input
                  type="text"
                  id="first_name"
                  className="input"
                  placeholder="FIRST NAME"
                  {...register('first_name', { required: 'Name required' })}
                />
                <input
                  type="text"
                  id="last_name"
                  className="input"
                  placeholder="LAST NAME"
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

              <input
                type="tel"
                id="phone"
                className="input mb-y"
                placeholder="Phone Number"
                required
                {...register('phone', {
                  required: 'Please enter your phone number',
                  pattern: /^[0-9+-]+$/,
                  minLength: 6,
                  maxLength: 12,
                })}
              />

              <textarea
                placeholder={
                  'What questions would you like to discuss? Can we prepare anything for you before the call?'
                }
                id="notes"
                className="input textarea mb-y"
                {...register('notes')}
              />

              <button
                className="relative flex justify-between items-center w-full md:w-btnWidth max-w-full px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
                type={'submit'}
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
            <div className="relative mt-ydouble mb-2">
              <p className="font-medium uppercase">{`Session time submitted`}</p>
            </div>
          )}
        </div>
      </div>
    </Block>
  )
}

export default CalendarBlock
