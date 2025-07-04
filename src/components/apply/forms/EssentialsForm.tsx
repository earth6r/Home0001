/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import {
  updateUserEssentials,
  updateUserEssentialsWithMessage,
  updateUserRooms,
} from '../actions'
import { useForm } from 'react-hook-form'
import { animateScroll as scroll } from 'react-scroll'
import { FormProps } from '../types'
import FormPane from '../FormPane'
import { ESSENTIALS, SIZES } from '../consts'

export const EssentialsForm: FC<FormProps> = ({
  user,
  updateUser,
  className,
}) => {
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
    if (
      !user?.email ||
      !user.phone_number ||
      !user.comms ||
      !user.first_name ||
      (!data?.essentials && !data?.essentials_other)
    ) {
      console.error('Missing required user or form fields')
      setFormError({ error: true, message: 'At least one essential required' })
      setFormSubmitted({ submitted: true, success: false })
      return
    }
    setIsSubmitting(true)

    const essentials = data.essentials || []
    if (data.essentials_other) {
      essentials.push(data.essentials_other)
    }

    updateUserEssentialsWithMessage(
      user.email,
      essentials,
      user.phone_number as string,
      {
        comms: (user.comms as 'WhatsApp' | 'Telegram').toLowerCase() as
          | 'whatsapp'
          | 'telegram',
        first_name: user.first_name as string,
      }
    ).then(res => {
      if (!res?.success) {
        console.error('Error updating user essentials:', res?.message)
        setFormError({ error: true, message: 'User essentials update failed' })
        setFormSubmitted({ submitted: true, success: false })
        setIsSubmitting(false)
      } else {
        updateUser({
          ...user,
          step: 'token',
          hasFinishedProfile: true,
        })

        setFormSubmitted({ submitted: true, success: true })
        scroll.scrollToTop({ behavior: 'smooth' })
      }
    })
  }

  return (
    <FormPane
      id="essentials-form"
      buttonText="Submit Application"
      className={className}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y">
        <p className="mb-y !mx-0 !text-bodyLg !font-bold">
          {`Last question:`}
          <br />
          {`What are your essentials?`}
        </p>

        {ESSENTIALS.map(({ label, name }) => (
          <div key={name}>
            <input
              type="checkbox"
              value={name}
              id={name}
              {...register('essentials', { required: false })}
            />
            <label
              className="text-left cursor-pointer font-medium text-xs tracking-normal uppercase"
              htmlFor={name}
            >
              {label}
            </label>
          </div>
        ))}
        <input
          type="text"
          placeholder="SOMETHING ELSE?"
          {...register('essentials_other', { required: false })}
          className="input"
        />

        {formError.error && (
          <p className="text-[#FF0000] font-medium uppercase">
            {formError.message}
          </p>
        )}
      </div>
    </FormPane>
  )
}
