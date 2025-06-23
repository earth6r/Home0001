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

  const [checkedCount, setCheckedCount] = useState(0)
  const max = 3

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
        <div className="flex flex-col gap-y mb-ydouble">
          <p className="!mx-0 !text-bodyLg !font-bold mb-y">
            {`Thanks, we’ve received your payment. Your application has started. The next step is to answer 4 quick questions.`}
          </p>
          <p className="!mx-0 !text-bodyLg !font-bold">{`Where do you want to buy?`}</p>
          <p className="!mx-0">{`Select up to 3 locations.`}</p>
        </div>
        {LOCATIONS.map(({ label, name }) => (
          <div key={name}>
            <input
              type="checkbox"
              value={name}
              id={name}
              {...register('interested_cities', {
                required: 'Choose at least one location',
              })}
              onClick={e => {
                const target = e.target as HTMLInputElement
                if (checkedCount >= max && target.checked) {
                  e.preventDefault()
                  return
                }
                if (target.checked) {
                  setCheckedCount(checkedCount + 1)
                } else {
                  setCheckedCount(checkedCount - 1)
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
        <div key={'Else'}>
          <input
            type="checkbox"
            id={'Else'}
            {...register('Else', {
              required: false,
            })}
            onClick={e => {
              const target = e.target as HTMLInputElement
              if (checkedCount >= max && target.checked) {
                e.preventDefault()
                return
              }
              if (target.checked) {
                setCheckedCount(checkedCount + 1)
                setHiddenInputShown(!hiddenInputShown)
              } else {
                setCheckedCount(checkedCount - 1)
              }
            }}
          />
          <label
            className="text-left cursor-pointer font-medium text-xs tracking-normal uppercase"
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
            'input !py-0 !border-none'
          )}
        />
      </div>
    </FormPane>
  )
}
