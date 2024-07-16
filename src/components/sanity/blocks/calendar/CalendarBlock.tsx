/* eslint-disable no-console */
import { useEffect, useState, type FC } from 'react'
import classNames from 'classnames'
import type { CalendarBlock as CalendarBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'
import { DateSelect } from '@components/date-select'
import { useForm } from 'react-hook-form'
import { createGoogleCalendarMeeting, getAvailableSlots } from '@components/buy'
import IconSmallArrow from '@components/icons/IconSmallArrow'

type CalendarBlockProps = Omit<SanityBlockElement, keyof CalendarBlockType> &
  CalendarBlockType

export const CalendarBlock: FC<CalendarBlockProps> = ({
  header,
  embedCode,
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
    // if (!data.email) return
    // createGoogleCalendarMeeting(data, data.email)
    //   .then(res => {
    //     console.log(res)
    //     setFormSubmitted(true)
    //   })
    //   .catch(err => {
    //     setFormError({
    //       error: true,
    //       message: (err as any).response.data.message as string,
    //     })
    //     console.error(err)
    //   })
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
      {header && (
        <RichText blocks={header} className="mb-y text-left md:text-center" />
      )}

      {!formSubmitted && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:max-w-[526px] h-full mt-ydouble"
        >
          <DateSelect
            availableSlots={availableSlots}
            register={register}
            loading={loading}
          />

          <button
            className="relative flex justify-between items-center w-full md:w-btnWidth max-w-full px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
            type={'submit'}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Book my homebuying session'}
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
          <p className="font-medium uppercase">{`Session time submitted`}</p>
        </div>
      )}
    </Block>
  )
}

export default CalendarBlock
