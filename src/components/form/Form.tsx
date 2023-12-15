import type { FC } from 'react'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form'
import { submitForm } from '@lib/util/submit-forms'
import { sendGoogleEvent } from '@lib/util'
import { RichText } from '@components/sanity'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { useCookies } from 'react-cookie'

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  audienceId?: string
  formType?: 'modal' | 'newsletter' | 'contact' | 'general' | 'unit' | 'broker'
  successMessage?: RichTextType | string
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
  formSubmitted: boolean
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  isHomeBlock?: boolean
}

export const Form: FC<FormProps> = ({
  audienceId,
  formType,
  className,
  successMessage,
  handleSubmit,
  formSubmitted,
  setFormSubmitted,
  isHomeBlock,
  children,
}) => {
  const [formError, setFormError] = useState<unknown | string | null>(null)
  const [cookies, setCookie, removeCookie] = useCookies()
  const [hutk, setHutk] = useState<string | undefined>()

  useEffect(() => {
    if (cookies.hubspotutk) {
      setHutk(cookies.hubspotutk)
    }
  }, [])

  const onSubmit = async (data: any) => {
    const options = {
      units: data.units_interested ? data.units_interested : [],
      locations_of_interest: data.locations_of_interest
        ? data.locations_of_interest
        : [],
      homeWaitingBlock: isHomeBlock ? true : false,
      unitInquiry: formType === 'unit' ? true : false,
    }
    sendGoogleEvent('submit waitlist form', options)

    if (!audienceId || !formType) return
    try {
      const result = await submitForm(data, audienceId, formType, hutk)
      setFormSubmitted(true)
    } catch (error) {
      setFormError(error)
      console.log(error)
    }
  }

  return (
    <div className={classNames(className)}>
      {formSubmitted ? (
        <div className="relative mt-ylg mb-2">
          {typeof successMessage === 'string' ? (
            <p className="font-bold text-lg">{successMessage}</p>
          ) : (
            successMessage && <RichText blocks={successMessage} />
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
          {children}
          {formError != null && (
            <div className="md:w-[calc(50%+var(--space-x)+6px)] md:ml-auto py-2">
              <div className="relative text-left py-4 text-[red] uppercase text-base">
                <p>{`Error submitting form`}</p>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  )
}

export default Form
