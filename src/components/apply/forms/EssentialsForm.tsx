/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import { updateUserRooms } from '../actions'
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
    if (!user?.email || !data?.bedroom_preference) {
      console.error('Missing required form fields')
      return
    }
    setIsSubmitting(true)
  }

  return (
    <FormPane
      id="essentials-form"
      className={className}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y">
        <p className="!mx-0 !text-bodyLg !font-bold">
          {`Last question:`}
          <br />
          {`What are your essentials?`}
          <br />
          {`Select anything that’s crucial for you.`}
        </p>
        <div className="flex flex-col gap-y mb-ydouble">
          <p className="!mx-0 ">{`Select all that apply.`}</p>
        </div>
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
          className="input !py-0 !border-none"
        />

        {formError.error && (
          <p className="text-red font-medium uppercase">{formError.message}</p>
        )}
      </div>
    </FormPane>
  )
}
