import type { FC, MouseEvent } from 'react'
import { HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { Link } from '@components/links'
import { useForm } from 'react-hook-form'
import { submitForm } from '@lib/util/submit-forms'

interface HubspotFormProps extends HTMLAttributes<HTMLElement> {
  audienceId?: string
  formType?: 'unit' | 'general' | 'newsletter'
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

const SUCCESS_COPY = `You're on the waitlist. We’ll be in touch as homes are released for sale.`

export const HubspotForm: FC<HubspotFormProps> = ({
  audienceId,
  formType,
  className,
}) => {
  const [submitted, setSubmitted] = useState(false)
  const [succesMessage, setSuccessMessage] = useState('')
  const [result, setResult] = useState({})
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })
  const [hiddenInputShown, setHiddenInputShown] = useState(false)

  const onSubmit = async (data: any) => {
    if (!audienceId || !formType) return
    try {
      const result = await submitForm(data, audienceId, formType)
      setResult('success')
      setSuccessMessage(SUCCESS_COPY)
    } catch (error) {
      setResult('error')
      console.log(error)
    }
  }

  return result === 'success' ? (
    <div className="relative mb-4 rich-text">
      <p>{`Your data — our harvest.`}</p>
    </div>
  ) : (
    <div className={classNames(className)}>
      {submitted ? (
        <div className="relative mb-2 text-mobile-body md:text-desktop-body">
          <p>{succesMessage}</p>
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
                    required
                    {...register('first_name', { required: true })}
                  />
                  <input
                    type="text"
                    id="last_name"
                    className="input"
                    placeholder="LAST NAME"
                    required
                    {...register('last_name', { required: true })}
                  />
                </div>
              )}

              <input
                placeholder="YOUR EMAIL"
                type="email"
                id="email"
                className="input"
                required
                {...register('email', { required: true })}
              />
              <input
                type="text"
                className="absolute top-0 left-0 w-0 h-0 opacity-0 z-behind"
                value="no-data"
                tabIndex={-1}
                autoComplete="off"
                {...register('fax_data', { required: true })}
              />

              {formType !== 'unit' && (
                <>
                  <p className="mt-4">Where do you want to live?</p>
                  {LOCATIONS.map(({ label, name }) => (
                    <div className="mb-4" key={name}>
                      <input type="checkbox" name={name} id={name} />
                      <label
                        className="text-left ml-xhalf cursor-pointer"
                        htmlFor={name}
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                  <div className="mb-4" key={'else'}>
                    <input
                      type="checkbox"
                      name={'else'}
                      id={'else'}
                      onChange={() => setHiddenInputShown(!hiddenInputShown)}
                    />
                    <label
                      className="text-left ml-xhalf cursor-pointer"
                      htmlFor={'else'}
                    >
                      {`Somewhere else`}
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="WHERE?"
                    name="City"
                    className={classNames(
                      hiddenInputShown ? 'mb-4' : 'hidden',
                      'input'
                    )}
                  />
                </>
              )}
            </div>
            <div
              className={classNames(
                formType === 'unit' ? 'mt-10' : 'mt-6',
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
                  <Link href="/homes/contact" className="border-bottom">
                    Ask us anything
                  </Link>
                  {`.`}
                </p>
              )}
            </div>
          </div>
          {result === 'error' && (
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
