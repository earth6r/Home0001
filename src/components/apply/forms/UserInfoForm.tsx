/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import { createUserProfile } from '../actions'
import { Controller, useForm } from 'react-hook-form'
import IconChevron from '@components/icons/IconChevron'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { animateScroll as scroll } from 'react-scroll'
import { FormProps } from '../types'
import FormPane from '../FormPane'
import { isMobile } from 'react-device-detect'

export const UserInfoForm: FC<FormProps> = ({
  user,
  updateUser,
  className,
}) => {
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
      public_profiles: [
        data.public_profiles_x,
        data.public_profiles_instagram,
        data.public_profiles_website,
        data.public_profiles_other,
      ].filter(Boolean),
    }).then(res => {
      if (!res?.success) {
        console.error('Error creating user profile:', res?.message)
        setFormError({ error: true, message: 'Profile creation failed' })
        setFormSubmitted({ submitted: true, success: false })
        setIsSubmitting(false)
      } else {
        updateUser({
          ...user,
          step: 'payment',
          signup_source: 'payment',
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
        <p className="!mx-0 !text-bodyLg !font-bold">{`Tell us a little about yourself:`}</p>

        <div className="relative flex flex-col gap-y">
          <input
            type="text"
            placeholder="First name*"
            className="input"
            {...register('first_name', { required: 'First name required' })}
          />
          <input
            type="text"
            placeholder="Last name*"
            className="input"
            {...register('last_name', { required: 'Last name required' })}
          />

          <input
            type="email"
            placeholder="Email*"
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
                placeholder="Phone Number*"
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
              <span className="text-button !font-bold">{`Your public profiles`}</span>
            </label>
            <input
              type="text"
              className="input"
              placeholder="X"
              {...register('public_profiles_x')}
            />
            <input
              type="text"
              className="input"
              placeholder="Instagram"
              {...register('public_profiles_instagram')}
            />
            <input
              type="text"
              className="input"
              placeholder="Website"
              {...register('public_profiles_website')}
            />
            <input
              type="text"
              className="input"
              placeholder="farcaster / other"
              {...register('public_profiles_other')}
            />
          </div>

          <div className="relative mt-y">
            <p className="mb-y !font-bold">{`Pick your favourite messaging app that you check regularly.`}</p>
            <select
              id="preferred-comms"
              className="relative input select text-button font-sans"
              disabled={isSubmitting}
              {...register('comms', {
                required: 'Communication preference required',
                validate: value => value === 'WhatsApp' || value === 'Telegram',
              })}
            >
              <option className="text-button" value="">
                {isMobile
                  ? `Select communication pref*`
                  : `Select communication preference*`}
              </option>
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
            <IconChevron className="absolute w-[12px] right-x bottom-[1.4em]" />
          </div>
        </div>

        <div className="flex flex-col gap-ydouble my-y">
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
              <span>{`I agree to receive communications from HOME0001 about my membership.*`}</span>
            </label>
          </div>

          <p className="!mx-0">{`*Required.`}</p>

          {/* <div className="flex w-full">
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
          </div> */}
        </div>
      </div>
    </FormPane>
  )
}
