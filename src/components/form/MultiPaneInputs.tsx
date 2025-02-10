import type { FC } from 'react'
import { HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'
import { RichText as RichTextType, UnitGroup } from '@studio/gen/sanity-schema'
import Pane from './Pane'
import { useBrokerInquiryModal } from '@contexts/modals'
import { submitForm } from '@lib/util'
import { RichText } from '@components/sanity'
import IconChevron from '@components/icons/IconChevron'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

interface UnitGroupContent extends Omit<UnitGroup, 'property'> {
  property?: {
    _id?: string
  }
}

export interface KeyedUnitGroup extends UnitGroupContent {
  _key: string
}

interface CheckboxPaneProps extends PaneProps {
  fieldCode: string
  fields: { label?: string; name?: string }[]
  type?: 'checkbox' | 'radio'
}

interface PaneProps extends HTMLAttributes<HTMLElement> {
  register: UseFormRegister<FieldValues>
  broker?: boolean
  showConsent?: boolean
  consentCopy?: RichTextType
  isSubmitting?: boolean
  control?: Control<FieldValues, any>
  errors?: FieldErrors<FieldValues>
}

interface MultiPaneInputsProps extends HTMLAttributes<HTMLElement> {
  block?: boolean
  header?: string
  copy?: RichTextType | string
  buttonCopy?: string
  register: UseFormRegister<FieldValues>
  trigger: () => Promise<boolean>
  setFullWidth?: () => void
  formValues?: any
  broker?: boolean
  formPanes?: string[]
  isSubmitting: boolean
  consentCopy?: RichTextType
  showConsent?: boolean
  control?: Control<FieldValues, any>
  errors?: FieldErrors<FieldValues>
}

const LOCATIONS = [
  {
    label: 'Los Angeles',
    name: 'LA',
  },
  {
    label: 'New York',
    name: 'NYC',
  },
  {
    label: 'Paris',
    name: 'Paris',
  },
  {
    label: 'London',
    name: 'London',
  },
  {
    label: 'Berlin',
    name: 'Berlin',
  },
  {
    label: 'Mexico City',
    name: 'CDMX',
  },
]

const TIMELINE = [
  {
    label: 'Immediately',
    name: 'now',
  },
  {
    label: 'In 1 - 3 months',
    name: '1to3mos',
  },
  {
    label: 'In 3 - 6 months',
    name: '3to6mos',
  },
  {
    label: 'In 6 - 12 months',
    name: '6to12mos',
  },
  {
    label: `Not sure yet`,
    name: 'notsure',
  },
]

const SIZES = [
  {
    label: 'Studio',
    name: 'Studio',
  },
  {
    label: 'At least 1 Bedroom',
    name: '1bdrm',
  },
  {
    label: 'At least 2 Bedrooms',
    name: '2bdrm',
  },
  {
    label: '3 Bedrooms +',
    name: '3+bdrm',
  },
  {
    label: 'Depends',
    name: 'Depends',
  },
]

const NameEmailPane: FC<PaneProps> = ({
  register,
  broker,
  showConsent,
  consentCopy,
  isSubmitting,
  control,
  errors,
  className,
}) => {
  const [brokerInquiryOpen, setBrokerInquiryOpen] = useBrokerInquiryModal()

  return (
    <div className={className}>
      <input
        type="text"
        id="first_name"
        className="waitlist input"
        placeholder="FIRST NAME"
        {...register('first_name', { required: 'First name is required' })}
      />
      <input
        type="text"
        id="last_name"
        className="waitlist input"
        placeholder="LAST NAME"
        {...register('last_name', { required: 'Last name is required' })}
      />

      <input
        placeholder="YOUR EMAIL"
        type="email"
        id="email"
        className="waitlist input"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Please enter a valid email',
          },
        })}
      />

      <Controller
        control={control}
        rules={{
          validate: (value = '') => isValidPhoneNumber(value),
        }}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            value={value}
            onChange={onChange}
            defaultCountry="US"
            placeholder="PHONE NUMBER"
            disabled={isSubmitting}
            id="phone"
            className="waitlist input"
          />
        )}
      />
      {errors?.phone && (
        <p className="mb-y text-button text-red-600 leading-loose">
          Invalid Phone Number: Please select the country code from the dropdown
          and do not include any spaces.
        </p>
      )}

      <div className="relative md:max-w-[var(--btn-width)] mt-y">
        <p className="mb-y text-button">{`Communication Preference`}</p>
        <select
          id="preferred-comms"
          className="waitlist input select text-button font-sans"
          disabled={isSubmitting}
          {...register('comms')}
        >
          <option
            key="option-comms-0"
            id="preferred-comms"
            value="whatsapp"
            className="text-button"
          >
            {`WhatsApp`}
          </option>
          <option
            key="option-comms-1"
            id="preferred-comms"
            value="whatsapp"
            className="text-button"
          >
            {`SMS`}
          </option>
          <option
            key="option-comms-2"
            id="preferred-comms"
            value="telegram"
            className="text-button"
          >
            {`Telegram`}
          </option>
        </select>
        <IconChevron className="absolute w-[12px] right-x top-[65%] transform rotate-0" />
      </div>

      {broker && (
        <button
          className="md:max-w-[var(--btn-width)] pb-[2px] text-left font-bold text-md tracking-normal underline decoration-[2px] underline-offset-2"
          onClick={() => setBrokerInquiryOpen(true)}
        >
          Are you a realtor?
        </button>
      )}

      {showConsent && consentCopy && (
        <div className="flex w-full md:w-btnWidth">
          <input
            type="checkbox"
            id="consent"
            className="flex-grow"
            {...register('consent', { required: true })}
          />
          <label
            className="w-full md:w-[calc(var(--btn-width)-1rem)] text-left cursor-pointer font-medium text-md tracking-normal"
            htmlFor="consent"
          >
            <RichText blocks={consentCopy} />
          </label>
        </div>
      )}
    </div>
  )
}

const LocationsPane: FC<PaneProps> = ({ register, className }) => {
  const [hiddenInputShown, setHiddenInputShown] = useState(false)

  return (
    <div className={className}>
      {LOCATIONS.map(({ label, name }) => (
        <div key={name}>
          <input
            type="checkbox"
            value={name}
            id={name}
            {...register('locations_of_interest', { required: false })}
          />
          <label
            className="text-left cursor-pointer font-medium text-md tracking-normal"
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
          className="text-left cursor-pointer font-medium text-md tracking-normal"
          htmlFor={'Else'}
        >
          {`Somewhere else`}
        </label>
      </div>
      <input
        type="text"
        placeholder="WHERE?"
        {...register('City', { required: false })}
        className={classNames(
          hiddenInputShown ? '' : 'opacity-0',
          'input my-y md:my-yhalf'
        )}
      />
    </div>
  )
}

const CheckboxPane: FC<CheckboxPaneProps> = ({
  fields,
  fieldCode,
  type,
  register,
  className,
}) => {
  return (
    <div className={classNames(className)}>
      {fields.map(({ label, name }: any) => (
        <div key={name}>
          <input
            type={type || 'checkbox'}
            value={name}
            id={name}
            {...register(fieldCode, { required: false })}
          />
          <label
            className="text-left cursor-pointer font-medium text-md tracking-normal"
            htmlFor={name}
          >
            {label}
          </label>
        </div>
      ))}
    </div>
  )
}

export const MultiPaneInputs: FC<MultiPaneInputsProps> = ({
  block,
  header,
  copy,
  buttonCopy,
  formPanes,
  isSubmitting,
  register,
  setFullWidth,
  className,
  trigger,
  showConsent,
  consentCopy,
  formValues,
  control,
  errors,
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [initialFieldsError, setInitialFieldsError] = useState(false)
  return (
    <div className={classNames(className, block ? '' : 'w-full')}>
      <Pane
        block={block}
        largeHeader={true}
        enter={currentStep === 0}
        currentStep={currentStep}
        header={header}
        copy={copy}
        isSubmitting={isSubmitting}
        buttonType={`button`}
        className={classNames(currentStep !== 0 ? 'hidden' : '')}
        onClick={async () => {
          const data = formValues()
          const options = {
            location: window.location.pathname,
          }
          const { first_name, last_name, email } = data

          // sendGoogleEvent('started waitlist form', options)
          const formData = {
            first_name: first_name,
            last_name: last_name,
            email: email,
          }
          //todo: should we move form ID to sanity for this one?
          const form_ID = 'e44ec9f1-928b-429b-8293-0b561d7b64b5'
          await submitForm(formData, form_ID, 'started_submit')
          if (first_name && last_name && email) {
            setCurrentStep(currentStep + 1)
            setFullWidth && setFullWidth()
          } else {
            setInitialFieldsError(true)
          }
        }}
      >
        <NameEmailPane
          broker={true}
          register={register}
          showConsent={showConsent}
          consentCopy={consentCopy}
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
          className={classNames(
            currentStep !== 0 ? 'hidden' : '',
            block ? 'h-[490px]' : '',
            'flex flex-col gap-y md:h-auto'
          )}
        />
        {initialFieldsError && (
          <p className="mt-y text-base">All fields required</p>
        )}
      </Pane>

      <Pane
        enter={currentStep === 1}
        currentStep={currentStep}
        header={`Join the waitlist`}
        copy={'Where do you want to own?'}
        buttonCopy={`Submit`}
        buttonType={`button`}
        isSubmitting={isSubmitting}
        onClick={() => setCurrentStep(currentStep + 1)}
        onBack={() => setCurrentStep(currentStep - 1)}
        className={currentStep !== 1 ? 'hidden' : ''}
      >
        <LocationsPane
          register={register}
          className={classNames(
            currentStep !== 1 ? 'hidden' : '',
            'flex flex-col gap-y h-auto'
          )}
        />
      </Pane>

      <Pane
        enter={currentStep === 2}
        currentStep={currentStep}
        header={`Join the waitlist`}
        copy={`When are you looking to buy?`}
        buttonCopy="Submit"
        buttonType="button"
        isSubmitting={isSubmitting}
        onClick={() => setCurrentStep(currentStep + 1)}
        onBack={() => setCurrentStep(currentStep - 1)}
        className={currentStep !== 2 ? 'hidden' : ''}
      >
        <CheckboxPane
          fields={TIMELINE}
          type={'radio'}
          fieldCode="buyingtimelinedec2023"
          register={register}
          className={classNames(
            currentStep !== 2 ? 'hidden' : '',
            'flex flex-col gap-y h-auto'
          )}
        />
      </Pane>

      <Pane
        enter={currentStep === 3}
        currentStep={currentStep}
        header={`Join the waitlist`}
        isSubmitting={isSubmitting}
        copy={`Last question: how many bedrooms are you looking for?`}
        buttonCopy={buttonCopy}
        buttonType="submit"
        onBack={() => setCurrentStep(currentStep - 1)}
        className={currentStep !== 3 ? 'hidden' : ''}
      >
        <CheckboxPane
          fields={SIZES}
          fieldCode="bedroom_preference"
          register={register}
          className={classNames(
            currentStep !== 3 ? 'hidden' : '',
            'flex flex-col gap-y h-auto'
          )}
        />
      </Pane>
    </div>
  )
}

export default MultiPaneInputs
