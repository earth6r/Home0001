/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import { updateUserRooms } from '../actions'
import { useForm } from 'react-hook-form'
import { animateScroll as scroll } from 'react-scroll'
import { FormProps } from '../types'
import FormPane from '../FormPane'
import { SIZES } from '../consts'

export const RoomsForm: FC<FormProps> = ({ user, updateUser, className }) => {
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

    let minBedrooms = null
    let maxBedrooms = null
    let depends = false

    const selection = data.bedroom_preference

    if (selection === 'Depends') {
      depends = true
      minBedrooms = null
      maxBedrooms = null
    } else {
      const roomRanges: { min: number; max: number | null }[] = []

      switch (selection) {
        case 'Studio':
          roomRanges.push({ min: 0, max: 0 })
          break
        case '1bdrm':
          roomRanges.push({ min: 1, max: 1 })
          break
        case '2bdrm':
          roomRanges.push({ min: 2, max: 2 })
          break
        case '3+bdrm':
          roomRanges.push({ min: 3, max: null })
          break
        default:
          console.error('Invalid bedroom preference selected:', selection)
      }
    }

    updateUserRooms(user.email, minBedrooms, maxBedrooms, depends).then(res => {
      if (!res?.success) {
        console.error('Error updating user rooms:', res?.message)
        setFormError({ error: true, message: 'User rooms update failed' })
        setFormSubmitted({ submitted: true, success: false })
        setIsSubmitting(false)
      } else {
        updateUser({
          ...user,
          step: 'essentials',
          bedrooms: data?.bedroom_preference,
        })

        setFormSubmitted({ submitted: true, success: true })
        scroll.scrollToTop({ behavior: 'smooth' })
      }
    })
  }

  return (
    <FormPane
      id="rooms-form"
      className={className}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y">
        <p className="!mx-0 mb-y !text-bodyLg !font-bold">
          {`How many bedrooms are you looking for?`}
        </p>
        {SIZES.map(({ label, name }) => (
          <div key={name}>
            <input
              type="radio"
              value={name}
              id={name}
              defaultChecked={user?.bedrooms === name}
              {...register('bedroom_preference', {
                required: 'Please select a bedroom preference',
              })}
            />
            <label
              className="text-left cursor-pointer font-medium text-xs tracking-normal uppercase"
              htmlFor={name}
            >
              {label}
            </label>
          </div>
        ))}

        {formError.error && (
          <p className="text-[#FF0000] font-medium uppercase">
            {formError.message}
          </p>
        )}
      </div>
    </FormPane>
  )
}
