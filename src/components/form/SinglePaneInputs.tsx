import type { FC } from 'react'
import { HTMLAttributes, useContext, useState } from 'react'
import classNames from 'classnames'
import { Link } from '@components/links'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { HomeContext } from '@contexts/home'
import { useCookies } from 'react-cookie'
import brand from '@/pages/brand'

interface SinglePaneInputsProps extends HTMLAttributes<HTMLElement> {
  fields?: {
    showName?: boolean
    showPhone?: boolean
    showContact?: boolean
    showLocation?: boolean
    showContactLink?: boolean
  }
  isSubmitting?: boolean
  submitButtonCopy?: string
  modal?: boolean
  brandStyle?: boolean
  register: UseFormRegister<FieldValues>
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

export const SinglePaneInputs: FC<SinglePaneInputsProps> = ({
  fields,
  isSubmitting,
  submitButtonCopy,
  brandStyle,
  modal,
  register,
  className,
}) => {
  const [hiddenInputShown, setHiddenInputShown] = useState(false)
  const [unitInput, setUnitInput] = useState(false)

  const { state } = useContext(HomeContext)

  return (
    <div className={classNames(className, 'w-full md:max-w-[526px]')}>
      <div
        className={classNames(
          modal
            ? 'flex justify-between h-[calc(100%-var(--btn-height))] md:h-auto overflow-scroll'
            : '',
          brandStyle ? 'flex-row items-center' : 'flex-col',
          'relative flex gap-y'
        )}
      >
        <div className="relative flex flex-col gap-y">
          {fields?.showName && (
            <div
              className={classNames(
                modal ? 'flex-col' : 'flex-row',
                'flex gap-y'
              )}
            >
              <input
                type="text"
                id="first_name"
                className={classNames(modal ? 'waitlist' : '', 'input')}
                placeholder="FIRST NAME"
                {...register('first_name', { required: 'Name required' })}
              />
              <input
                type="text"
                id="last_name"
                className={classNames(modal ? 'waitlist' : '', 'input')}
                placeholder="LAST NAME"
                {...register('last_name', { required: 'Name required' })}
              />
            </div>
          )}

          <input
            placeholder={brandStyle ? 'YOUR EMAIL ADDRESS' : 'YOUR EMAIL'}
            type="email"
            id="email"
            className={classNames(
              modal ? 'waitlist' : '',
              brandStyle ? 'brand' : '',
              'input'
            )}
            required
            {...register('email')}
            onChange={() => !unitInput && setUnitInput(true)}
          />

          {fields?.showPhone && (
            <>
              <input
                type="tel"
                id="phone"
                className={classNames(modal ? 'waitlist' : '', 'input')}
                placeholder="Phone Number"
                {...register('phone', {
                  required: 'Please enter your phone number',
                  pattern: /^[0-9+-]+$/,
                  minLength: 6,
                  maxLength: 12,
                })}
              />

              {/* <div className="flex w-full max-w-[var(--btn-width)] gap-xhalf">
                <input
                  type="checkbox"
                  id="sms_opt_in"
                  className="tel-checkbox"
                  {...register('sms_opt_in', { required: false })}
                />
                <label
                  className="flex-1 w-[calc(var(---btn-width)-20px)] text-left ml-x md:ml-xhalf cursor-pointer"
                  htmlFor="sms_opt_in"
                >
                  <p className="font-sansText text-lg leading-tight">
                    I agree to receive SMS communications from HOME0001 about
                    property availability.
                    <br />
                    <br />I understand that data rates may apply and that I can
                    reply STOP to opt out at any time.
                  </p>
                </label>
              </div> */}
            </>
          )}
        </div>

        {fields?.showLocation ? (
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
          <>
            {unitInput && (
              <input
                type="hidden"
                value={state.unit?.title || 'Unit Placeholder'}
                {...register('unit_of_interest', { required: false })}
              />
            )}
          </>
        )}

        {fields?.showContact && (
          <>
            <label
              htmlFor="hs_persona"
              className="font-medium mt-yhalf text-md"
            >
              Which best describes you?
            </label>

            <div>
              <input
                type="radio"
                value="persona_2"
                id="purchasing"
                {...register('hs_persona', { required: 'Input  required' })}
              />
              <label
                className="text-left cursor-pointer font-medium text-md"
                htmlFor="purchasing"
              >
                {`I am interested in purchasing a home.`}
              </label>
            </div>

            <div>
              <input
                type="radio"
                value="persona_3"
                id="learn_more"
                {...register('hs_persona', { required: 'Input  required' })}
              />
              <label
                className="text-left cursor-pointer font-medium text-md"
                htmlFor="learn_more"
              >
                {`I want to learn more about HOME0001.`}
              </label>
            </div>

            <div>
              <input
                type="radio"
                value="persona_1"
                id="realitor"
                {...register('hs_persona', { required: 'Input  required' })}
              />
              <label
                className="text-left cursor-pointer font-medium text-md"
                htmlFor="realitor"
              >
                {`I am a realtor.`}
              </label>
            </div>

            <textarea
              rows={5}
              id="message"
              className="block p-5 mt-yhalf"
              placeholder="LEAVE US A MESSAGE"
              {...register('message', { required: 'Message required' })}
            />
          </>
        )}

        <div
          className={classNames(
            fields?.showLocation ? 'mt-10' : 'mt-1 md:mt-6',
            brandStyle ? '!m-0' : '',
            'relative flex flex-col gap-2 md:gap-y'
          )}
        >
          <button
            className={classNames(
              brandStyle
                ? 'border-black px-1 font-normal'
                : 'h-btn text-white bg-black',
              'md:max-w-[var(--btn-width)] w-full text-center uppercase font-medium text-xs'
            )}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : submitButtonCopy || 'Submit'}
          </button>
          {fields?.showContactLink && (
            <p className="mt-5 md:my-5">
              {`Got questions?${' '}`}
              <Link href="/contact" className="border-bottom">
                Ask us anything
              </Link>
              {`.`}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SinglePaneInputs
