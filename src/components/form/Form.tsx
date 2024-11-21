import type { FC } from 'react'
import React, { HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form'
import { submitForm } from '@lib/util/submit-forms'
import { sendGoogleEvent } from '@lib/util'
import { RichText } from '@components/sanity'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { useRouter } from 'next/router'
import { useLocalCookies } from '@contexts/cookies'
import axios from 'axios'
import { saveError } from '@lib/util/save-error'

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
    | 'block'
  successMessage?: RichTextType | string
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
  formSubmitted: boolean
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  isHomeBlock?: boolean
  actionUrl?: string
}

export const Form: FC<FormProps> = ({
  audienceId,
  formType,
  className,
  successMessage,
  handleSubmit,
  formSubmitted,
  setFormSubmitted,
  actionUrl,
  isHomeBlock,
  children,
}) => {
  const [formError, setFormError] = useState<unknown | string | null>(null)
  const [hutk, setHutk] = useLocalCookies()
  const { asPath, query } = useRouter()

  const onSubmit = async (data: any) => {
    const options = {
      units: data.units_interested || [],
      locations_of_interest: data.locations_of_interest || [],
      homeWaitingBlock: !!isHomeBlock,
      unitInquiry: !!(formType === 'unit'),
    }
    sendGoogleEvent('submit waitlist form', options)

    if (!audienceId || !formType) {
      return
    }

    let result
    let localQuery
    let paths

    if (typeof window !== 'undefined') {
      localQuery = sessionStorage.getItem('query')
      paths = sessionStorage.getItem('routes')
    }

    try {
      result = await submitForm(
        data,
        audienceId,
        formType,
        hutk,
        actionUrl,
        query as Record<string, string>
      )

      const errorData = new FormData()
      errorData.append('Page', asPath)
      errorData.append('Routes', paths || 'error getting routes')
      errorData.append('Hutk', JSON.stringify(hutk))
      errorData.append('Error', JSON.stringify('none'))
      errorData.append('Form Data', JSON.stringify(data))
      errorData.append('User Agent', navigator.userAgent)
      errorData.append('Full Query', localQuery || 'none')

      const action =
        'https://script.google.com/macros/s/AKfycbxUUM_jfDehp4zHDXSA-mDA1wEyCyn1nxhMe0EjF7vg7WAXv4DxYTcPKNKxufLqCNbK/exec'
      fetch(action, {
        method: 'POST',
        body: errorData,
      })
      console.error('data.altHome', data.altHome, typeof data.altHome)
      await axios.post(
        'https://us-central1-homeearthnet.cloudfunctions.net/register',
        {
          page: asPath,
          routes: paths || 'error getting routes',
          hutk: hutk,
          error: null,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          locationsOfInterest: data.locations_of_interest,
          Else: data.Else,
          city: data.City,
          bedroomPreference: data.bedroom_preference,
          buyingTimelinedec2023: data.buyingtimelinedec2023,
          userAgent: navigator?.userAgent || null,
          fullQuery: localQuery || null,
          phoneNumber: data.phone,
          altHome: data.altHome,
          communicationPreference: data.comms,
        }
      )
      setFormSubmitted(true)
    } catch (error) {
      setFormError(error)
      console.error(error)

      const errorData = new FormData()
      errorData.append('Page', asPath)
      errorData.append('Routes', paths || 'error getting routes')
      errorData.append('Hutk', JSON.stringify(hutk))
      errorData.append('Error', JSON.stringify(error))
      errorData.append('Form Data', JSON.stringify(data))
      errorData.append('User Agent', navigator.userAgent)
      errorData.append('Full Query', localQuery || 'none')

      const action =
        'https://script.google.com/macros/s/AKfycbxUUM_jfDehp4zHDXSA-mDA1wEyCyn1nxhMe0EjF7vg7WAXv4DxYTcPKNKxufLqCNbK/exec'

      fetch(action, {
        method: 'POST',
        body: errorData,
      })

      saveError(error, 'submitRegisterForm')

      setFormSubmitted(true)
    }
  }

  return (
    <div className={classNames(className)}>
      {formSubmitted ? (
        <div className="relative mt-ydouble mb-2">
          {formType === 'preference' ? (
            <div>
              <p className="text-h4">
                {'Thank you for sharing your preferences'}
              </p>
              <br></br>
              <p className="text-base">
                To set up a 15 minute phone consultation{' '}
                <a
                  href="https://www.home0001.com/schedule-call"
                  target="_blank"
                  className={'underline font-bold'}
                >
                  you can click here
                </a>
                .{' '}
              </p>
            </div>
          ) : typeof successMessage === 'string' ? (
            <p className="font-bold tracking-tight">{successMessage}</p>
          ) : (
            successMessage && (
              <RichText className="bold" blocks={successMessage} />
            )
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
          {children}
        </form>
      )}
    </div>
  )
}

export default Form
