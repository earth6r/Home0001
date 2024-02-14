import type { FC } from 'react'
import { HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { RichText as RichTextType, UnitGroup } from '@studio/gen/sanity-schema'
import Pane from './Pane'
import { useBrokerInquiryModal } from '@contexts/modals'
import { sendGoogleEvent } from '@lib/util'
import { submitForm } from '@lib/util'

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

const NameEmailPane: FC<PaneProps> = ({ register, broker, className }) => {
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

      {broker && (
        <button
          className="md:max-w-[var(--btn-width)] pt-[26px] md:pt-[20px] text-right font-bold text-md tracking-details uppercase underline decoration-[1.5px] underline-offset-2"
          onClick={() => setBrokerInquiryOpen(true)}
        >
          Are you a realtor?
        </button>
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
            className="text-left cursor-pointer font-medium text-md"
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
          className="text-left cursor-pointer font-medium text-md"
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
          'input mb-4'
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
            className="text-left cursor-pointer font-medium text-md"
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
  formValues,
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  return (
    <div className={classNames(className, block ? '' : 'pr-menu', 'w-full')}>
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

          sendGoogleEvent('started waitlist form', options)
          const formData = {
            first_name: first_name,
            last_name: last_name,
            email: email,
          }
          //todo: should we move form ID to sanity for this one?
          const form_ID = 'e44ec9f1-928b-429b-8293-0b561d7b64b5'
          await submitForm(formData, form_ID, 'started_submit')
          const triggerResult = await trigger()
          if (triggerResult) {
            setCurrentStep(currentStep + 1)
            setFullWidth && setFullWidth()
          }
        }}
      >
        <NameEmailPane
          broker={true}
          register={register}
          className={classNames(
            currentStep !== 0 ? 'hidden' : '',
            block ? 'h-[248px]' : '',
            'flex flex-col gap-y md:h-auto'
          )}
        />
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
