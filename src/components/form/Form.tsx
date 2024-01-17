import type { FC } from 'react'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form'
import { submitForm } from '@lib/util/submit-forms'
import { sendGoogleEvent } from '@lib/util'
import { RichText } from '@components/sanity'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  audienceId?: string
  formType?:
    | 'modal'
    | 'newsletter'
    | 'contact'
    | 'general'
    | 'unit'
    | 'broker'
    | 'preference'
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
  const { asPath } = useRouter()

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

    let result

    try {
      result = await submitForm(data, audienceId, formType, hutk)

      const errorData = new FormData()
      errorData.append('Page', asPath)
      errorData.append('Error', JSON.stringify('none'))
      errorData.append('Payload', JSON.stringify(result))
      errorData.append('Form Data', JSON.stringify(data))
      errorData.append('User Agent', navigator.userAgent)
      const action =
        'https://script.google.com/macros/s/AKfycbyjuXITThcGvAHcYXNI6Wp5pYPywADwHJbAe__To9uAAAYEXpyfxecRzioAMfLgl0hX/exec'

      fetch(action, {
        method: 'POST',
        body: errorData,
      })
    } catch (error) {
      setFormError(error)
      console.log(error)

      const errorData = new FormData()
      errorData.append('Page', asPath)
      errorData.append('Error', JSON.stringify(error))
      errorData.append('Payload', JSON.stringify(result))
      errorData.append('Form Data', JSON.stringify(data))
      errorData.append('User Agent', navigator.userAgent)
      const action =
        'https://script.google.com/macros/s/AKfycbyjuXITThcGvAHcYXNI6Wp5pYPywADwHJbAe__To9uAAAYEXpyfxecRzioAMfLgl0hX/exec'

      fetch(action, {
        method: 'POST',
        body: errorData,
      })
    } finally {
      setFormSubmitted(true)
    }
  }

  return (
    <div className={classNames(className)}>
      {formSubmitted ? (
        <div className="relative mt-ylg mb-2">
          {formType === 'preference' ? (
            <div>
              <p className="font-bold text-lg">
                {'Thank you for sharing your preferences'}
              </p>
              <br></br>
              <p className="text-base">
                To set up a 15 minute phone consultation{' '}
                <a
                  href="https://www.calendly.com/tourlower-east-side0001/schedulecall"
                  target="_blank"
                  className={'underline font-bold'}
                >
                  you can click here
                </a>
                .{' '}
              </p>
            </div>
          ) : typeof successMessage === 'string' ? (
            <p className="font-bold text-lg">{successMessage}</p>
          ) : (
            successMessage && <RichText blocks={successMessage} />
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {children}
          {/* {formError != null && (
            <div className="md:w-[calc(50%+var(--space-x)+6px)] md:ml-auto py-2">
              <div className="relative text-left py-4 text-[red] uppercase text-base">
                <p>{`Error submitting form`}</p>
              </div>
            </div>
          )} */}
        </form>
      )}
    </div>
  )
}

export default Form
