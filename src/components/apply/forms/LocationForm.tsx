/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import { updateUserLocation } from '../actions'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { animateScroll as scroll } from 'react-scroll'
import { FormProps } from '../types'
import { LOCATIONS } from '../consts'
import FormPane from '../FormPane'

export const LocationForm: FC<FormProps> = ({
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
  const [hiddenInputShown, setHiddenInputShown] = useState(false)

  const onSubmit = async (data: any) => {
    if (!user?.email || !data?.interested_cities) {
      console.error('Missing required form fields')
      return
    }
    setIsSubmitting(true)

    updateUserLocation(
      user.email,
      data.interested_cities,
      data.city_general
    ).then(res => {
      if (!res?.success) {
        console.error('Error updating user location:', res?.message)
        setFormError({ error: true, message: 'User location update failed' })
        setFormSubmitted({ submitted: true, success: false })
        setIsSubmitting(false)
      } else {
        updateUser({
          ...user,
          step: 'priceRange',
        })

        setFormSubmitted({ submitted: true, success: true })
        scroll.scrollToTop({ behavior: 'smooth' })
      }
    })
  }
  return (
    <FormPane
      id="location-form"
      className={className}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y">
        <p className="text-bodyLg">{`Where do you want to buy?`}</p>
        <p className="!mx-0">{`Select up to 3 locations.`}</p>

        {LOCATIONS.map(({ label, name }) => (
          <div key={name}>
            <input
              type="checkbox"
              value={name}
              id={name}
              {...register('interested_cities', {
                required: 'Choose at least one location',
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
            className="text-left cursor-pointer font-medium text-xs tracking-normal"
            htmlFor={'Else'}
          >
            {`Somewhere else`}
          </label>
        </div>
        <input
          type="text"
          placeholder="WHERE?"
          {...register('city_general', { required: false })}
          className={classNames(
            hiddenInputShown ? '' : 'opacity-0',
            'input my-y md:my-yhalf'
          )}
        />
      </div>
    </FormPane>
  )
}
