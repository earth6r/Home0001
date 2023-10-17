import type { FC, MouseEvent } from 'react'
import { HTMLAttributes, useContext, useState } from 'react'
import classNames from 'classnames'
import { Link } from '@components/links'
import { useForm } from 'react-hook-form'
import { submitForm } from '@lib/util/submit-forms'
import { HomeContext } from '@contexts/home'
import { sendGoogleEvent } from '@lib/util'
import { RichText } from '@components/sanity'
import type { TypedObject } from '@portabletext/types'
interface HubspotFormProps extends HTMLAttributes<HTMLElement> {
  audienceId?: string
  formType?: 'unit' | 'general' | 'newsletter'
  unitFormSuccessMessage?: TypedObject
}

const LOCATIONS = [
  {
    label: 'Los Angeles',
    name: 'LA',
  },
  {
    label: 'New York',
    name: 'NYC',
  },
  {
    label: 'Paris (coming soon)',
    name: 'Paris',
  },
  {
    label: 'London (coming soon)',
    name: 'London',
  },
  {
    label: 'Berlin (coming soon)',
    name: 'Berlin',
  },
  {
    label: 'Mexico City (coming soon)',
    name: 'CDMX',
  },
]

const GENERAL_SUCCESS_COPY = `You're on the waitlist. We’ll be in touch as homes are released for sale.`

export const HubspotForm: FC<HubspotFormProps> = ({
  audienceId,
  formType,
  className,
  unitFormSuccessMessage,
}) => {
  const [submitted, setSubmitted] = useState(false)
  const [succesMessage, setSuccessMessage] = useState<TypedObject>()
  const [formError, setFormError] = useState<unknown | string | null>(null)
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })
  const [hiddenInputShown, setHiddenInputShown] = useState(false)
  const { state } = useContext(HomeContext)

  const onSubmit = async (data: any) => {
    // send form data
    if (formType === 'unit') {
      sendGoogleEvent('submit_reservation_form', {
        'unit of interest': state.unit?.title,
      })
    }

    if (!audienceId || !formType) return
    try {
      const result = await submitForm(data, audienceId, formType)
      setSubmitted(true)
      if (unitFormSuccessMessage) {
        setSuccessMessage(unitFormSuccessMessage)
      }
    } catch (error) {
      setFormError(error)
      console.log(error)
    }
  }

  return (
    <div className={classNames(className)}>
      {submitted ? (
        <div className="relative mb-2 text-mobile-body md:text-desktop-body">
          {succesMessage ? (
            <RichText blocks={succesMessage} />
          ) : formType == 'newsletter' ? (
            <p>Your data — our harvest.</p>
          ) : (
            <p>{GENERAL_SUCCESS_COPY}</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full">
            <div className="relative flex flex-col gap-4">
              {formType !== 'newsletter' && (
                <div className="flex flex-row gap-4">
                  <input
                    type="text"
                    id="first_name"
                    className="input"
                    placeholder="FIRST NAME"
                    {...register('first_name', { required: true })}
                  />
                  <input
                    type="text"
                    id="last_name"
                    className="input"
                    placeholder="LAST NAME"
                    {...register('last_name', { required: true })}
                  />
                </div>
              )}

              <input
                placeholder="YOUR EMAIL"
                type="email"
                id="email"
                className="input"
                {...register('email', { required: true })}
              />

              {formType !== 'unit' ? (
                <>
                  <p className="mt-4">Where do you want to live?</p>
                  {LOCATIONS.map(({ label, name }) => (
                    <div className="mb-1 md:mb-4" key={name}>
                      <input
                        type="checkbox"
                        id={name}
                        {...register(name, { required: false })}
                      />
                      <label
                        className="text-left ml-x md:ml-xhalf cursor-pointer"
                        htmlFor={name}
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                  <div className="mb-4" key={'Else'}>
                    <input
                      type="checkbox"
                      id={'Else'}
                      {...register('Else', {
                        required: false,
                        onChange: () => setHiddenInputShown(!hiddenInputShown),
                      })}
                    />
                    <label
                      className="text-left ml-x md:ml-xhalf cursor-pointer"
                      htmlFor={'Else'}
                    >
                      {`Somewhere else`}
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="WHERE?"
                    {...register('City', { required: false })}
                    className={classNames(
                      hiddenInputShown ? 'mb-4' : 'hidden',
                      'input'
                    )}
                  />
                </>
              ) : (
                <input
                  type="hidden"
                  value={state.unit?.title}
                  {...register('unit_of_interest', { required: false })}
                />
              )}
            </div>
            <div
              className={classNames(
                formType === 'unit' ? 'mt-10' : 'mt-1 md:mt-6',
                'relative flex flex-col gap-2 md:gap-4'
              )}
            >
              <button
                className="tracking-normal h-12 max-h-12 text-center tracking-caps uppercase text-white bg-black text-mobile-body md:text-desktop-body"
                type="submit"
              >
                {formType === 'newsletter' ? `Submit` : `Join the waitlist`}
              </button>
              {formType !== 'newsletter' && (
                <p className="mt-5">
                  {`Got questions?${' '}`}
                  <Link href="/contact" className="border-bottom">
                    Ask us anything
                  </Link>
                  {`.`}
                </p>
              )}
            </div>
          </div>
          {formError != null && (
            <div className="mt-yhalf text-center py-4 text-[red] border-1 border-solid border-red text-base">
              <p>{`Error submitting form`}</p>
            </div>
          )}
        </form>
      )}
    </div>
  )
}

export default HubspotForm
