/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import { updateUserTimeline } from '../actions'
import { useForm } from 'react-hook-form'
import { animateScroll as scroll } from 'react-scroll'
import { FormProps } from '../types'
import FormPane from '../FormPane'
import { TIMELINE } from '../consts'

export const TimelineForm: FC<FormProps> = ({ user, setUser, className }) => {
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
    if (!user?.email || !data?.buyingtimelinedec2023) {
      console.error('Missing required form fields')
      return
    }
    setIsSubmitting(true)

    let timeline:
      | 'IMMEDIATELY'
      | 'IN_1_3_MONTHS'
      | 'IN_3_6_MONTHS'
      | 'IN_6_12_MONTHS'
      | 'NOT_SURE_YET' = 'NOT_SURE_YET'

    switch (data.buyingtimelinedec2023) {
      case 'now':
        timeline = 'IMMEDIATELY'
        break
      case '1to3mos':
        timeline = 'IN_1_3_MONTHS'
        break
      case '3to6mos':
        timeline = 'IN_3_6_MONTHS'
        break
      case '6to12mos':
        timeline = 'IN_6_12_MONTHS'
        break
      case 'notsure':
        timeline = 'NOT_SURE_YET'
        break
      default:
        console.error('Invalid timeline selected')
        setIsSubmitting(false)
        return
    }

    updateUserTimeline(user.email, timeline).then(res => {
      if (!res?.success) {
        console.error('Error updating user timeline:', res?.message)
        setFormError({ error: true, message: 'User timeline update failed' })
        setFormSubmitted({ submitted: true, success: false })
        setIsSubmitting(false)
      } else {
        setUser({
          ...user,
          step: 'bedrooms',
        })

        setFormSubmitted({ submitted: true, success: true })
        scroll.scrollToTop({ behavior: 'smooth' })
      }
    })
  }
  return (
    <FormPane
      id="timeline-form"
      className={className}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y">
        <h3>{`When are you looking to buy?`}</h3>

        {TIMELINE.map(({ label, name }) => (
          <div key={name}>
            <input
              type="radio"
              value={name}
              id={name}
              {...register('buyingtimelinedec2023', { required: false })}
            />
            <label
              className="text-left cursor-pointer font-medium text-xs tracking-normal"
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
