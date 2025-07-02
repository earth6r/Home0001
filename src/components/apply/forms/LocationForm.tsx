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

  const [selectedOrder, setSelectedOrder] = useState<string[]>([]) // Track selection order
  const max = 3

  const onSubmit = async (data: any) => {
    if (!user?.email) {
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
        <div className="flex flex-col gap-y mb-y">
          <p className="!mx-0 !text-bodyLg !font-bold mb-y">
            {`We’ve received your payment.`} <br />
            {`Now tell us what you’re looking for.`}
          </p>
          <p className="!mx-0 mb-y !text-bodyLg !font-bold">{`Where do you want to buy?`}</p>
        </div>
        {LOCATIONS.map(({ label, name }) => (
          <div key={name}>
            <input
              type="checkbox"
              value={name}
              id={name}
              checked={selectedOrder.includes(name)}
              {...register('interested_cities')}
              onChange={() => {
                const isCurrentlySelected = selectedOrder.includes(name)

                if (isCurrentlySelected) {
                  const newOrder = selectedOrder.filter(item => item !== name)
                  setSelectedOrder(newOrder)
                } else {
                  let newOrder = [...selectedOrder, name]

                  if (newOrder.length > max) {
                    newOrder = newOrder.slice(1)
                  }

                  setSelectedOrder(newOrder)
                }
              }}
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
          placeholder="Somewhere else?"
          {...register('city_general')}
          className={classNames('input')}
        />
      </div>
    </FormPane>
  )
}
