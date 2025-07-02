/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { RichText } from '@components/sanity/rich-text'
import { TypedObject } from 'sanity'
import { AccountSettingsProps } from './types'
import { Controller, useForm } from 'react-hook-form'
import { updateUserProfile } from './actions'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { ArrowBtn } from '@components/btns'

export const AccountSettings: FC<AccountSettingsProps> = ({
  content,
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
  const [hasEdited, setHasEdited] = useState(false)
  const [showFirstName, setShowFirstName] = useState(false)
  const [showLastName, setShowLastName] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const [showPhone, setShowPhone] = useState(false)
  const [showComms, setShowComms] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState({ error: false, message: '' })
  const [formSubmitted, setFormSubmitted] = useState({
    submitted: false,
    success: false,
  })

  const onSubmit = async (data: any) => {
    if (!data || !user || !user.id) {
      console.error('Missing required form fields or user')
      return
    }
    setIsSubmitting(true)

    updateUserProfile({
      id: user.id,
      first_name: data.first_name || user.first_name,
      last_name: data.last_name || user.last_name,
      email: data.email || user.email,
      phone_number: data.phone || user.phone_number,
      comms: data.comms || user.comms,
    }).then(res => {
      if (!res?.success) {
        console.error('Error updating user profile:', res?.message)
        setFormError({ error: true, message: 'Update user profile failed' })
        setFormSubmitted({ submitted: true, success: false })
        setIsSubmitting(false)
      } else {
        if (updateUser)
          updateUser({
            ...user,
            first_name: data.first_name || user.first_name,
            last_name: data.last_name || user.last_name,
            email: data.email || user.email,
            phone_number: data.phone || user.phone_number,
          })

        setFormSubmitted({ submitted: true, success: true })
      }
    })
  }

  return (
    <div className={classNames(className, 'flex flex-col gap-ydouble')}>
      <h1 className="text-h3">{`Account Settings:`}</h1>
      {formSubmitted.success && (
        <RichText
          blocks={content as TypedObject | TypedObject[]}
          className="mb-ydouble"
        />
      )}

      <h2 className="text-h4">{`Current Account Info:`}</h2>

      <form
        id="account-settings-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-ydouble rich-text"
      >
        <div className="flex flex-col gap-y !m-0">
          <span className="text-h4">{`First Name:`}</span>
          <div className="flex justify-between items-center">
            <span className="">{user?.first_name || `N/A`}</span>
            <button
              type="button"
              onClick={() => {
                setHasEdited(true)
                setShowFirstName(true)
              }}
              className="underline"
            >
              <span>{`Edit`}</span>
            </button>
          </div>

          <input
            type={showFirstName ? 'text' : 'hidden'}
            className="input"
            {...register('first_name')}
          />
        </div>

        <div className="flex flex-col gap-y !m-0">
          <span className="text-h4">{`Last Name:`}</span>
          <div className="flex justify-between items-center">
            <span className="">{user?.last_name || `N/A`}</span>
            <button
              type="button"
              onClick={() => {
                setHasEdited(true)
                setShowLastName(true)
              }}
              className="underline"
            >
              <span>{`Edit`}</span>
            </button>
          </div>

          <input
            type={showLastName ? 'text' : 'hidden'}
            className="input"
            {...register('last_name')}
          />
        </div>

        <div className="flex flex-col gap-y !m-0">
          <span className="text-h4">{`Email address:`}</span>
          <div className="flex justify-between items-center">
            <span className="">{user?.email || `N/A`}</span>
            <button
              type="button"
              onClick={() => {
                setHasEdited(true)
                setShowEmail(true)
              }}
              className="underline"
            >
              <span>{`Edit`}</span>
            </button>
          </div>

          <input
            type={showEmail ? 'email' : 'hidden'}
            className="input"
            {...register('email')}
          />
        </div>

        <div className="flex flex-col gap-y !m-0">
          <span className="text-h4">{`Phone Number:`}</span>
          <div className="flex justify-between items-center">
            <span className="">{user?.phone_number || `N/A`}</span>
            <button
              type="button"
              onClick={() => {
                setHasEdited(true)
                setShowPhone(true)
              }}
              className="underline"
            >
              <span>{`Edit`}</span>
            </button>
          </div>

          {showPhone && (
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
          )}
          {errors?.phone && (
            <p className="flex-1 mb-y text-button text-[#FF0000] leading-loose">
              Invalid Phone Number: Please select the country code from the
              dropdown and do not include any spaces.
            </p>
          )}
        </div>

        {/* <div className="flex flex-col gap-y !m-0">
          <span className="text-h4">{`Preferred app for communication with HOME0001:`}</span>
          <div className="flex justify-between items-center">
            <span className="">{user?.comms || ``}</span>
            <button
              type="button"
              onClick={() => {
                setHasEdited(true)
                setShowComms(true)
              }}
              className="underline"
            >
              <span>{`Edit`}</span>
            </button>
          </div>

          {showComms && (
            <div className="relative">
              <select
                id="preferred-comms"
                className="relative input select text-button font-sans"
                disabled={isSubmitting}
                {...register('comms', {
                  validate: value =>
                    value === 'WhatsApp' || value === 'Telegram',
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
          )}
        </div> */}

        {hasEdited && (
          <ArrowBtn
            type={'submit'}
            form="account-settings-form"
            disabled={isSubmitting}
            text={isSubmitting ? 'Submitting...' : 'Save Changes'}
            className={classNames('mb-y !my-0 z-above')}
          />
        )}
      </form>
    </div>
  )
}

export default AccountSettings
