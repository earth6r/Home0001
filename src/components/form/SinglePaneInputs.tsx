import type { FC, MouseEvent } from 'react'
import { HTMLAttributes, useContext, useState, useEffect } from 'react'
import classNames from 'classnames'
import { Link } from '@components/links'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { HomeContext } from '@contexts/home'
import { useCookies } from 'react-cookie'
import { Listbox } from '@headlessui/react'
import IconPlus from '@components/icons/IconPlus'

interface SinglePaneInputsProps extends HTMLAttributes<HTMLElement> {
  fields?: {
    showName?: boolean
    showPhone?: boolean
    showContact?: boolean
    showLocation?: boolean
    showContactLink?: boolean
  }
  submitButtonCopy?: string
  modal?: boolean
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
  submitButtonCopy,
  modal,
  register,
  className,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const [hutk, setHutk] = useState<string | undefined>()

  useEffect(() => {
    if (cookies.hubspotutk) {
      setHutk(cookies.hubspotutk)
    }
  }, [])

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
          'relative flex flex-col gap-3'
        )}
      >
        <div className="relative flex flex-col gap-3">
          {fields?.showName && (
            <div
              className={classNames(
                modal ? 'flex-col' : 'flex-row',
                'flex gap-3'
              )}
            >
              <input
                type="text"
                id="first_name"
                className={classNames(modal ? 'waitlist' : '', 'input')}
                placeholder="FIRST NAME"
                {...register('first_name', { required: true })}
              />
              <input
                type="text"
                id="last_name"
                className={classNames(modal ? 'waitlist' : '', 'input')}
                placeholder="LAST NAME"
                {...register('last_name', { required: true })}
              />
            </div>
          )}

          <input
            placeholder="YOUR EMAIL"
            type="email"
            id="email"
            onFocus={() => !unitInput && setUnitInput(true)}
            className={classNames(modal ? 'waitlist' : '', 'input')}
            {...register('email', { required: true })}
          />

          {fields?.showPhone && (
            <input
              type="tel"
              id="phone"
              className={classNames(modal ? 'waitlist' : '', 'input')}
              placeholder="Phone Number (Optional)"
              {...register('phone', { required: false })}
            />
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
            <label htmlFor="hs_persona" className="font-medium mt-yhalf">
              Which best describes you?
            </label>

            <div>
              <input
                type="radio"
                value="persona_2"
                id="purchasing"
                {...register('hs_persona', { required: false })}
              />
              <label
                className="text-left cursor-pointer font-medium text-sm"
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
                {...register('hs_persona', { required: false })}
              />
              <label
                className="text-left cursor-pointer font-medium text-sm"
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
                {...register('hs_persona', { required: false })}
              />
              <label
                className="text-left cursor-pointer font-medium text-sm"
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
              {...register('message', { required: true })}
            />
          </>
        )}

        <div
          className={classNames(
            fields?.showLocation ? 'mt-10' : 'mt-1 md:mt-6',
            'relative flex flex-col gap-2 md:gap-4'
          )}
        >
          <button
            className="tracking-details h-[42px] max-h-12 text-center uppercase text-white bg-black font-medium text-xs"
            type="submit"
          >
            {submitButtonCopy || 'Submit'}
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
