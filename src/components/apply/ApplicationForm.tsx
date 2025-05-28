/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { updateUserLocation } from './actions'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { animateScroll as scroll } from 'react-scroll'
import { FormProps } from './types'
import { LOCATIONS } from './consts'
import FormPane from './FormPane'
import { UserInfoForm, UserPaymentOptionForm, UserPaymentForm } from './forms'

const LocationForm: FC<FormProps> = ({ user, setUser, className }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUseNativeValidation: true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState({ error: false, message: '' })
  const [formSubmitted, setFormSubmitted] = useState({
    submitted: false,
    success: false,
  })
  const [hiddenInputShown, setHiddenInputShown] = useState(false)

  const onSubmit = async (data: any) => {
    if (!user?.email || !data?.locations_of_interest) {
      console.error('Missing required form fields')
      return
    }
    setIsSubmitting(true)

    updateUserLocation(user.email, data.locations_of_interest, data.City).then(
      res => {
        console.log('User location submitted:', res)
        if (!res?.success) {
          console.error('Error updating user location:', res?.message)
          setFormError({ error: true, message: 'User location update failed' })
          setFormSubmitted({ submitted: true, success: false })
          setIsSubmitting(false)
        } else {
          setUser({
            ...user,
            step: 'priceRange',
          })

          setFormSubmitted({ submitted: true, success: true })
          scroll.scrollToTop({ behavior: 'smooth' })
        }
      }
    )
  }
  return (
    <FormPane
      id="location-form"
      className={className}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y">
        <h3>{`Where do you want to buy?`}</h3>
        <p>{`Select up to 3 locations.`}</p>

        {LOCATIONS.map(({ label, name }) => (
          <div key={name}>
            <input
              type="checkbox"
              value={name}
              id={name}
              {...register('locations_of_interest', { required: false })}
            />
            <label
              className="text-left cursor-pointer font-medium text-md tracking-normal"
              htmlFor={name}
            >
              {label}
            </label>
          </div>
        ))}
        <div key={'Else'}>
          <input
            type="checkbox"
            id={'Else'}
            {...register('Else', {
              required: false,
              onChange: () => setHiddenInputShown(!hiddenInputShown),
            })}
          />
          <label
            className="text-left cursor-pointer font-medium text-md tracking-normal"
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
            hiddenInputShown ? '' : 'opacity-0',
            'input my-y md:my-yhalf'
          )}
        />
      </div>
    </FormPane>
  )
}

const ApplicationForm: FC<FormProps> = ({
  className,
  user,
  setUser,
  joiningFee,
  cryptoPrice,
}) => {
  const [formStarted, setFormStarted] = useState(false)

  return (
    <div className={classNames(className)}>
      <div className="h-full">
        <div className="grid md:grid-cols-2 gap-x pr-x rich-text">
          <h2>{`HOME0001: APPLICATION`}</h2>

          {formStarted ? (
            <div>
              {user?.step === 'info' && (
                <UserInfoForm user={user} setUser={setUser} />
              )}

              {user?.step === 'paymentOption' && (
                <UserPaymentOptionForm user={user} setUser={setUser} />
              )}

              {user?.step === 'payment' && (
                <UserPaymentForm
                  user={user}
                  setUser={setUser}
                  joiningFee={joiningFee}
                  cryptoPrice={cryptoPrice}
                  className="flex flex-col h-full"
                />
              )}

              {user?.step === 'location' && (
                <LocationForm user={user} setUser={setUser} />
              )}

              {user?.step === 'priceRange' && <p>{`price range form`}</p>}
            </div>
          ) : (
            <div className="flex flex-col justify-between h-[calc(95svh-var(--header-height))]">
              <p>{`The next step is for you to tell us a little about yourself, pay the application fee (if needed) and fill out the questionnaire.`}</p>

              <button
                onClick={() => {
                  setFormStarted(true)
                  scroll.scrollToTop({ behavior: 'smooth' })
                }}
                className={classNames(
                  'relative flex justify-between items-center w-full px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above'
                )}
              >
                {'Submit'}
                <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApplicationForm
