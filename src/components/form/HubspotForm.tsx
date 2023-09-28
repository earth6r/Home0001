import type { FC, MouseEvent } from 'react'
import { HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { Link } from '@components/links'
import { useForm } from 'react-hook-form'

interface HubspotFormProps extends HTMLAttributes<HTMLElement> {
  audienceId?: string
  formType?: 'unit' | 'general'
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
  {
    label: 'Somewhere else',
    name: 'Else',
  },
]

export const HubspotForm: FC<HubspotFormProps> = ({
  audienceId,
  formType,
  className,
}) => {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })
  const [cityChecked, setCityChecked] = useState(false)

  // const handleCheckChange = (event: MouseEvent<HTMLInputElement>) => {
  //   setCityChecked(event?.target?.checked)
  // }

  // const onSubmit = async data => {
  //   if (data.fax_data !== 'no-data') return
  //   // await submit_general_hubspot_waitlist_form(data)
  //   setSubmitted(true)
  // }

  const onSubmit = () => {
    // if (data.fax_data !== 'no-data') return
    // // await submit_general_hubspot_waitlist_form(data)
    // setSubmitted(true)
  }

  return (
    <div className={classNames(className)}>
      {submitted ? (
        <div className="relative mb-2 text-mobile-body md:text-desktop-body">
          <p>
            {`You're on the waitlist. We’ll be in touch as homes are
                  released for sale.`}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full">
            <div className="relative flex flex-col gap-4">
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

              {formType === 'general' && (
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
                  <input
                    type="text"
                    placeholder="WHERE?"
                    name="City"
                    className={classNames(
                      cityChecked ? 'mb-4' : 'hidden',
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
                Join the waitlist
              </button>
              <p className="mt-5">
                {`Got questions?${' '}`}
                <Link href="/homes/contact" className="border-bottom">
                  Ask us anything
                </Link>
                .
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default HubspotForm