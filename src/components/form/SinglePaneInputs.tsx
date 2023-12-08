import type { FC, MouseEvent } from 'react'
import { HTMLAttributes, useContext, useState, useEffect } from 'react'
import classNames from 'classnames'
import { Link } from '@components/links'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { HomeContext } from '@contexts/home'
import { useCookies } from 'react-cookie'

interface SinglePaneInputsProps extends HTMLAttributes<HTMLElement> {
  showNameFields?: boolean
  showContactFields?: boolean
  showLocationFields?: boolean
  showContactLink?: boolean
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
  showNameFields,
  showLocationFields,
  submitButtonCopy,
  showContactLink,
  showContactFields,
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
          {showNameFields && (
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
            className={classNames(modal ? 'waitlist' : '', 'input')}
            {...register('email', { required: true })}
          />
        </div>

        {showLocationFields ? (
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

        {showContactFields && (
          <>
            <label htmlFor="hs_persona">Which best describes you?</label>
            <select
              id="hs_persona"
              defaultValue={'default'}
              {...register('hs_persona', { required: true })}
              className="input"
            >
              <option disabled selected value={'default'}>
                -- select an option --
              </option>
              <option value="purchasing">
                I am interested in purchasing a home.
              </option>
              <option value="learn_more">
                I want to learn more about HOME0001.
              </option>
              <option value="realitor">I am a realtor.</option>
            </select>
            <textarea
              rows={5}
              id="message"
              className="block p-5"
              placeholder="LEAVE US A MESSAGE"
              {...register('message', { required: true })}
            />
          </>
        )}

        <div
          className={classNames(
            showLocationFields ? 'mt-10' : 'mt-1 md:mt-6',
            'relative flex flex-col gap-2 md:gap-4'
          )}
        >
          <button
            className="tracking-details h-[42px] max-h-12 text-center uppercase text-white bg-black font-medium text-xs"
            type="submit"
          >
            {submitButtonCopy || 'Submit'}
          </button>
          {showContactLink && (
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
