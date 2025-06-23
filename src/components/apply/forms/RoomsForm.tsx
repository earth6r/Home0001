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

    // Handle both single selection (string) and multiple selections (array)
    const selections = Array.isArray(data.bedroom_preference)
      ? data.bedroom_preference
      : [data.bedroom_preference]

    // Check if "Depends" is selected
    if (selections.includes('Depends')) {
      depends = true
      minBedrooms = null
      maxBedrooms = null
    } else {
      // Calculate min and max from all selections
      const roomRanges: { min: number; max: number | null }[] = []

      selections.forEach((selection: string) => {
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
      })

      if (roomRanges.length > 0) {
        // Find the minimum of all minimums
        minBedrooms = Math.min(...roomRanges.map(r => r.min))

        // Find the maximum of all maximums (handle null values for 3+)
        const maxValues = roomRanges.map(r => r.max).filter(max => max !== null)

        // If any selection has no max (like 3+), set maxBedrooms to null
        maxBedrooms =
          maxValues.length === roomRanges.length ? Math.max(...maxValues) : null
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
      id="rooms-form"
      className={className}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y">
        <p className="!mx-0 !text-bodyLg !font-bold">
          {`Last question:`}
          <br />
          {`How many bedrooms are you looking for?`}
          <br />
        </p>
        <div className="flex flex-col gap-y mb-ydouble">
          <p className="!mx-0 ">{`Select all that apply.`}</p>
        </div>
        {SIZES.map(({ label, name }) => (
          <div key={name}>
            <input
              type="checkbox"
              value={name}
              id={name}
              {...register('bedroom_preference', {
                required: 'Please select at least one bedroom preference',
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
          <p className="text-red font-medium uppercase">{formError.message}</p>
        )}
      </div>
    </FormPane>
  )
}
