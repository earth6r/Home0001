/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { Web3UserProps } from '@contexts/web3'
import { WalletPayment } from '@components/web3-wallet'
import {
  createUserProfile,
  initUserPayment,
  updateUserLocation,
} from './actions'
import classNames from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import IconChevron from '@components/icons/IconChevron'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { animateScroll as scroll } from 'react-scroll'

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
    label: 'Paris',
    name: 'Paris',
  },
  {
    label: 'London',
    name: 'London',
  },
  {
    label: 'Berlin',
    name: 'Berlin',
  },
  {
    label: 'Mexico City',
    name: 'CDMX',
  },
]

const TIMELINE = [
  {
    label: 'Immediately',
    name: 'now',
  },
  {
    label: 'In 1 - 3 months',
    name: '1to3mos',
  },
  {
    label: 'In 3 - 6 months',
    name: '3to6mos',
  },
  {
    label: 'In 6 - 12 months',
    name: '6to12mos',
  },
  {
    label: `Not sure yet`,
    name: 'notsure',
  },
]

const SIZES = [
  {
    label: 'Studio',
    name: 'Studio',
  },
  {
    label: 'At least 1 Bedroom',
    name: '1bdrm',
  },
  {
    label: 'At least 2 Bedrooms',
    name: '2bdrm',
  },
  {
    label: '3 Bedrooms +',
    name: '3+bdrm',
  },
  {
    label: 'Depends',
    name: 'Depends',
  },
]

type PaneProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isSubmitting?: boolean
  className?: string
  id?: string
  children?: React.ReactNode
}

type FormProps = {
  className?: string
  user: Web3UserProps
  setUser: (arg0: any) => void
  joiningFee?: number
  cryptoPrice?: number[]
}

const FormPane: FC<PaneProps> = ({
  id,
  isSubmitting,
  onSubmit,
  className,
  children,
}) => {
  return (
    <form
      id={id}
      className={classNames(
        className,
        'flex flex-col gap-y justify-between min-h-[calc(95svh-var(--header-height))]'
      )}
      onSubmit={onSubmit}
    >
      {children}

      <button
        type={'submit'}
        form={id}
        disabled={isSubmitting}
        className={classNames(
          'relative flex justify-between items-center w-full px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above'
        )}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
        <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
      </button>
    </form>
  )
}

const UserInfoForm: FC<FormProps> = ({ user, setUser, className }) => {
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

  const onSubmit = async (data: any) => {
    if (!data.email || !user?.address) {
      console.error('Missing required fields')
      return
    }
    setIsSubmitting(true)

    createUserProfile(user.address, {
      first_name: data.first_name as string,
      last_name: data.last_name as string,
      email: data.email as string,
      phone_number: data.phone as string,
      comms: data.comms as 'WhatsApp' | 'Telegram',
      wallet_address: user.address,
      public_profiles: data.public_profiles
        ? data.public_profiles.split(',').map((p: string) => p.trim())
        : [],
    }).then(res => {
      console.log('User profile created:', res)
      if (!res?.success) {
        console.error('Error creating user profile:', res?.message)
        setFormError({ error: true, message: 'Profile creation failed' })
        setFormSubmitted({ submitted: true, success: false })
        setIsSubmitting(false)
      } else {
        setUser({
          ...user,
          step: 'paymentOption',
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone,
          comms: data.comms,
          hasFinishedProfile: false,
        })

        setFormSubmitted({ submitted: true, success: true })
        scroll.scrollToTop({ behavior: 'smooth' })
      }
    })
  }

  return (
    <FormPane
      id="info-form"
      className={className}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative flex flex-col gap-y">
        <h3>{`Tell us about yourself!`}</h3>

        <div className="relative flex flex-col gap-y">
          <input
            type="text"
            placeholder="First name"
            className="input"
            {...register('first_name', { required: 'First name required' })}
          />
          <input
            type="text"
            placeholder="Last name"
            className="input"
            {...register('last_name', { required: 'Last name required' })}
          />

          <input
            type="email"
            placeholder="Email"
            className="input"
            {...register('email', { required: 'Email required' })}
          />
          <Controller
            control={control}
            rules={{
              validate: (value = '') => isValidPhoneNumber(value),
            }}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                value={value}
                onChange={onChange}
                defaultCountry="US"
                placeholder="PHONE NUMBER"
                disabled={isSubmitting}
                id="phone"
                className="input"
              />
            )}
          />
          {errors?.phone && (
            <p className="flex-1 mb-y text-button text-red-600 leading-loose">
              Invalid Phone Number: Please select the country code from the
              dropdown and do not include any spaces.
            </p>
          )}

          <div className="flex flex-col gap-y relative mt-y">
            <label htmlFor="public_profiles" className="flex flex-col gap-y">
              <span className="text-button">{`Your public profiles (optional)`}</span>
              <span className="text-base">{`Your social media, website or portfolio. Please seperate entries with a comma.`}</span>
            </label>
            <input
              type="text"
              className="input"
              {...register('public_profiles')}
            />
          </div>

          <div className="relative mt-y">
            <p className="mb-y text-button">{`Communication Preference`}</p>
            <select
              id="preferred-comms"
              className="input select text-button font-sans"
              disabled={isSubmitting}
              {...register('comms')}
            >
              <option
                key="option-comms-0"
                id="preferred-comms"
                value="WhatsApp"
                className="text-button"
              >
                {`WhatsApp`}
              </option>
              <option
                key="option-comms-2"
                id="preferred-comms"
                value="Telegram"
                className="text-button"
              >
                {`Telegram`}
              </option>
            </select>
            <IconChevron className="absolute w-[12px] right-x top-[65%] transform rotate-0" />
          </div>
        </div>

        <div className="flex flex-col gap-y mt-y">
          <div className="flex w-full">
            <input
              type="checkbox"
              id="consent"
              className="flex-grow"
              {...register('consent', { required: 'Required' })}
            />
            <label
              className="w-full text-left cursor-pointer font-medium text-md tracking-normal"
              htmlFor="consent"
            >
              <span>{`I agree to receive communications from HOME0001 about available properties. I understand that data rates may apply and that I can reply STOP to opt out at any time.`}</span>
            </label>
          </div>

          <div className="flex w-full">
            <input
              type="checkbox"
              id="member_consent"
              className="flex-grow"
              {...register('member_consent', { required: 'Required' })}
            />
            <label
              className="w-full text-left cursor-pointer font-medium text-md tracking-normal"
              htmlFor="member_consent"
            >
              <span>{`I agree to the Membership Terms & Conditions.`}</span>
            </label>
          </div>

          <div className="flex w-full">
            <input
              type="checkbox"
              id="application_consent"
              className="flex-grow"
              {...register('application_consent', { required: 'Required' })}
            />
            <label
              className="w-full text-left cursor-pointer font-medium text-md tracking-normal"
              htmlFor="application_consent"
            >
              <span>{`I agree to pay the application fee`}</span>
            </label>
          </div>
        </div>
      </div>
    </FormPane>
  )
}

const UserPaymentOptionForm: FC<FormProps> = ({ user, setUser, className }) => {
  const {
    register,
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

  const onSubmit = async (data: any) => {
    if (!data.referredToken || !user?.email) {
      console.error('Missing required fields for user:', user)
      return
    }
    setIsSubmitting(true)

    initUserPayment(user.email, {
      referred_token: data.referredToken,
      signup_source: 'referred',
    }).then(res => {
      console.log('Referral code submitted:', res)
      if (!res?.success) {
        console.error('Error making referral payment:', res?.message)
        setFormError({ error: true, message: 'Referral code failed' })
        setFormSubmitted({ submitted: true, success: false })
        setIsSubmitting(false)
      } else {
        setUser({
          ...user,
          step: 'location',
          referred_token: data.referredToken,
          signup_source: 'referred',
        })

        setFormSubmitted({ submitted: true, success: true })
        scroll.scrollToTop({ behavior: 'smooth' })
      }
    })
  }

  return (
    <FormPane
      id="payment-form"
      className={className}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-ydouble">
        <div>
          <h3>{`Were you referred by an existing member?`}</h3>
          <p className="!mx-0 mt-y">
            If you were please enter the referral they shared with you below.
            <br />
            Otherwise please press skip.
          </p>
        </div>

        <input
          type="text"
          id="referral"
          placeholder="Enter code"
          className="input"
          {...register('referredToken')}
        />

        <button
          onClick={() =>
            setUser({ ...user, step: 'payment', signup_source: 'payment' })
          }
          className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] bg-white border-black"
        >
          <IconSmallArrow fill="black" width="15" height="11" />

          <span className="uppercase font-medium leading-none text-xs">
            {`Skip`}
          </span>
        </button>
      </div>
    </FormPane>
  )
}

const UserPaymentForm: FC<FormProps> = ({
  user,
  setUser,
  joiningFee,
  cryptoPrice,
  className,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState({ error: false, message: '' })
  const [formSubmitted, setFormSubmitted] = useState({
    submitted: false,
    success: false,
  })

  const initPayment = async () => {
    if (!user?.email) {
      console.error('Missing required fields for user:', user)
      return
    }
    setIsSubmitting(true)

    initUserPayment(user.email, {
      signup_source: 'purchased',
    }).then(res => {
      console.log('Payment submitted:', res)
      if (!res?.success) {
        console.error('Error making payment:', res?.message)
        setFormError({ error: true, message: 'Payment failed' })
        setFormSubmitted({ submitted: true, success: false })
        setIsSubmitting(false)
      } else {
        setUser({
          ...user,
          step: 'location',
        })

        setFormSubmitted({ submitted: true, success: true })
        scroll.scrollToTop({ behavior: 'smooth' })
      }
    })
  }

  return (
    <div className={className}>
      <WalletPayment
        user={user}
        setUser={setUser}
        joiningFee={joiningFee}
        cryptoPrice={cryptoPrice}
        onStripeSuccess={initPayment}
        className="flex flex-col h-full mt-y"
      />
    </div>
  )
}

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
