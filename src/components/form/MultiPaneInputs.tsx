import type { FC } from 'react'
import { HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { RichText as RichTextType, UnitGroup } from '@studio/gen/sanity-schema'
import Pane from './Pane'
import { useBrokerInquiryModal } from '@contexts/modals'
import { sendGoogleEvent } from '@lib/util'
import { submitForm } from '@lib/util'
const HUBSPOT_ID = process.env.NEXT_PUBLIC_HUBSPOT_ID

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
    name: '1to30mos',
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
          className="text-left font-medium text-xs tracking-details underline pt-[28px] md:pt-[44px] pb-[12px]"
          onClick={() => setBrokerInquiryOpen(true)}
        >
          Are you a broker?
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
          'waitlist input mb-4'
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
  register,
  setFullWidth,
  className,
  trigger,
  formValues,
}) => {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div
      className={classNames(
        className,
        block ? '' : 'pr-menu',
        'w-full text-xs font-bold'
      )}
    >
      <Pane
        block={block}
        largeHeader={true}
        enter={currentStep === 0}
        currentStep={currentStep}
        header={header}
        copy={copy}
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
          const form_ID = 'e44ec9f1-928b-429b-8293-0b561d7b64b5'
          HUBSPOT_ID ? submitForm(formData, HUBSPOT_ID, form_ID) : null
          const triggerResult = await trigger()
          if (triggerResult) {
            setCurrentStep(currentStep + 1)
            setFullWidth && setFullWidth()
          }
        }}
      >
        <NameEmailPane
          broker={block}
          register={register}
          className={classNames(
            currentStep !== 0 ? 'hidden' : '',
            block ? 'h-[220px]' : '',
            'flex flex-col gap-3 md:h-auto'
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
        onClick={() => setCurrentStep(currentStep + 1)}
        onBack={() => setCurrentStep(currentStep - 1)}
        className={currentStep !== 1 ? 'hidden' : ''}
      >
        <LocationsPane
          register={register}
          className={classNames(
            currentStep !== 1 ? 'hidden' : '',
            'flex flex-col gap-4 h-[320px]'
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
            'flex flex-col gap-4 h-[320px]'
          )}
        />
      </Pane>

      <Pane
        enter={currentStep === 3}
        currentStep={currentStep}
        header={`Join the waitlist`}
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
            'flex flex-col gap-4 h-[292px] md:h-[320px]'
          )}
        />
      </Pane>
    </div>
  )
}

export default MultiPaneInputs
