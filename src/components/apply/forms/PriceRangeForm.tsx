/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import { updateUserPriceRange } from '../actions'
import { useForm } from 'react-hook-form'
import { animateScroll as scroll } from 'react-scroll'
import { FormProps } from '../types'
import FormPane from '../FormPane'
import { PRICES } from '../consts'

export const PriceRangeForm: FC<FormProps> = ({
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
    if (!user?.email || !data?.price_range) {
      console.error('Missing required form fields')
      return
    }
    setIsSubmitting(true)

    let minPrice = null
    let maxPrice = null

    switch (data.price_range) {
      case 'lessThan750k':
        minPrice = null
        maxPrice = 750000
        break
      case '$750kTo1M':
        minPrice = 750000
        maxPrice = 1000000
        break
      case '$1MTo1.5M':
        minPrice = 1000000
        maxPrice = 1500000
        break
      case '$1.5MTo2M':
        minPrice = 1500000
        maxPrice = 2000000
        break
      case 'moreThan2M':
        minPrice = 2000000
        maxPrice = null // No upper limit for this range
        break
      default:
        console.error('Invalid price range selected')
        setIsSubmitting(false)
        return
    }

    updateUserPriceRange(user.email, minPrice, maxPrice).then(res => {
      if (!res?.success) {
        console.error('Error updating user price range:', res?.message)
        setFormError({ error: true, message: 'User price range update failed' })
        setFormSubmitted({ submitted: true, success: false })
        setIsSubmitting(false)
      } else {
        updateUser({
          ...user,
          step: 'whenToBuy',
        })

        setFormSubmitted({ submitted: true, success: true })
        scroll.scrollToTop({ behavior: 'smooth' })
      }
    })
  }
  return (
    <FormPane
      id="price-range-form"
      className={className}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y">
        <p className="!mx-0 !text-bodyLg !font-bold">{`What’s your price range?`}</p>
        <p className="!mx-0 mb-y">{`Please select the most suitable range for you.`}</p>

        {PRICES.map(({ label, name }) => (
          <div key={name}>
            <input
              type="radio"
              value={name}
              id={name}
              {...register('price_range', { required: false })}
            />
            <label
              className="text-left cursor-pointer font-medium text-xs tracking-normal uppercase"
              htmlFor={name}
            >
              {label}
            </label>
          </div>
        ))}
      </div>
    </FormPane>
  )
}
