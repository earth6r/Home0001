import type { FC } from 'react'
import React, { HTMLAttributes, forwardRef, useEffect, useState } from 'react'
import classNames from 'classnames'
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form'
import { submitForm } from '@lib/util/submit-forms'
import { sendGoogleEvent } from '@lib/util'
import { RichText } from '@components/sanity'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { useCookies } from 'react-cookie'

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  audienceId?: string
  formType?: 'modal' | 'newsletter' | 'contact' | 'general' | 'unit'
  successMessage?: RichTextType | string
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
  formSubmitted: boolean
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

export const Form: FC<FormProps> = ({
  audienceId,
  formType,
  className,
  successMessage,
  handleSubmit,
  formSubmitted,
  setFormSubmitted,
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
    // if (formType === 'unit') {
    //   sendGoogleEvent('submit_reservation_form', {
    //     'unit of interest': state.unit?.title,
    //   })
    // } else if (menuModal) sendGoogleEvent('submit_modal_waitlist_form')
    // else if (formType == 'general')
    //   sendGoogleEvent('submit_general_waitlist_form')

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
        <div className="relative mb-2">
          {typeof successMessage === 'string' ? (
            <p>{successMessage}</p>
          ) : (
            successMessage && <RichText blocks={successMessage} />
          )}
        </div>
      ) : (
        <form
          id={'waitlist-form'}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full"
        >
          {children}
          {formError != null && (
            <div className="py-yhalf">
              <div className="relative text-center py-4 text-[red] border-1 border-solid border-red text-base">
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
