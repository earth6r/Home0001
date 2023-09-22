import type { FC, MouseEvent } from 'react'
import { HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { Link } from '@components/links'
import { useForm } from 'react-hook-form'

interface HubspotFormProps extends HTMLAttributes<HTMLElement> {
  audienceId?: string
  formType?: string
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

  const onSubmit = async data => {
    if (data.fax_data !== 'no-data') return
    // await submit_general_hubspot_waitlist_form(data)
    setSubmitted(true)
  }

  return (
    <div className={classNames(className)}>
      <div className="animate-in relative">
        <div className="w-screen h-full -ml-4 md:-ml-10 absolute bg-whitesmoke"></div>
        <div className="md:col-start-2 md:col-span-1 pt-10 pb-10">
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
                  <input
                    type="text"
                    id="full_name"
                    className="input"
                    placeholder="FULL NAME"
                    required
                    {...register('full_name', { required: true })}
                  />
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
                    className="best-in-class"
                    value="no-data"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register('fax_data', { required: true })}
                  />

                  <p className="mt-4">Where do you want to live?</p>
                  {LOCATIONS.map(({ label, name }) => (
                    <div className="mb-4" key={name}>
                      <input className="" type="checkbox" name={name} />
                      <label className="text-left ml-2 ">{label}</label>
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
                </div>
                <div className="relative mt-6 flex flex-col gap-2 md:gap-4">
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
      </div>
    </div>
  )
}

export default HubspotForm
