import type { FC } from 'react'
import { HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { RichText as RichTextType, UnitGroup } from '@studio/gen/sanity-schema'
import Pane from './Pane'

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
}

interface PaneProps extends HTMLAttributes<HTMLElement> {
  register: UseFormRegister<FieldValues>
}

interface MultiPaneInputsProps extends HTMLAttributes<HTMLElement> {
  header?: string
  copy?: RichTextType | string
  buttonCopy?: string
  register: UseFormRegister<FieldValues>
  trigger: () => Promise<boolean>
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

const PRICES = [
  {
    label: '<$500,000',
    name: 'tk',
  },
  {
    label: '$500,000 - $750,000',
    name: 'tk',
  },
  {
    label: '$750,000 - $1,000,000',
    name: 'tk',
  },
  {
    label: '$1,000,000 - $1,500,000',
    name: 'tk',
  },
  {
    label: '$1,500,000+',
    name: 'tk',
  },
]

const TIMELINE = [
  {
    label: 'Immediately',
    name: 'tk',
  },
  {
    label: 'In 1 - 3 months',
    name: 'tk',
  },
  {
    label: 'In 3 - 6 months',
    name: 'tk',
  },
  {
    label: 'In 6 - 12 months',
    name: 'tk',
  },
  {
    label: `Not sure yet`,
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
    name: 'tk',
  },
]

const NameEmailPane: FC<PaneProps> = ({ register, className }) => {
  return (
    <div className={className}>
      <input
        type="text"
        id="first_name"
        className="input"
        placeholder="FIRST NAME"
        {...register('first_name', { required: 'First name is required' })}
      />
      <input
        type="text"
        id="last_name"
        className="input"
        placeholder="LAST NAME"
        {...register('last_name', { required: 'Last name is required' })}
      />

      <input
        placeholder="YOUR EMAIL"
        type="email"
        id="email"
        className="input"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Please enter a valid email',
          },
        })}
      />
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
        className={classNames(hiddenInputShown ? 'mb-4' : 'hidden', 'input')}
      />
    </div>
  )
}

const CheckboxPane: FC<CheckboxPaneProps> = ({
  fields,
  fieldCode,
  register,
  className,
}) => {
  return (
    <div className={classNames(className)}>
      {fields.map(({ label, name }: any) => (
        <div key={name}>
          <input
            type="checkbox"
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
  header,
  copy,
  buttonCopy,
  register,
  className,
  trigger,
}) => {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className={classNames(className, 'w-full pr-menu text-xs font-bold')}>
      <Pane
        largeHeader={true}
        enter={currentStep === 0}
        currentStep={currentStep}
        header={header}
        copy={copy}
        buttonType={`button`}
        className={classNames(currentStep !== 0 ? 'hidden' : '')}
        onClick={async () => {
          const triggerResult = await trigger()
          if (triggerResult) setCurrentStep(currentStep + 1)
        }}
      >
        <NameEmailPane
          register={register}
          className={classNames(
            currentStep !== 0 ? 'hidden' : '',
            'flex flex-col gap-3'
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
            'flex flex-col gap-4'
          )}
        />
      </Pane>

      <Pane
        enter={currentStep === 2}
        currentStep={currentStep}
        header={`Join the waitlist`}
        copy={`What's your price range?`}
        buttonType="button"
        buttonCopy="Submit"
        onBack={() => setCurrentStep(currentStep - 1)}
        onClick={() => setCurrentStep(currentStep + 1)}
        className={currentStep !== 2 ? 'hidden' : ''}
      >
        <CheckboxPane
          fields={PRICES}
          fieldCode="tk"
          register={register}
          className={classNames(
            currentStep !== 2 ? 'hidden' : '',
            'flex flex-col gap-4'
          )}
        />
      </Pane>

      <Pane
        enter={currentStep === 3}
        currentStep={currentStep}
        header={`Join the waitlist`}
        copy={`When are you looking to buy?`}
        buttonCopy="Submit"
        buttonType="button"
        onClick={() => setCurrentStep(currentStep + 1)}
        onBack={() => setCurrentStep(currentStep - 1)}
        className={currentStep !== 3 ? 'hidden' : ''}
      >
        <CheckboxPane
          fields={TIMELINE}
          fieldCode="tk"
          register={register}
          className={classNames(
            currentStep !== 3 ? 'hidden' : '',
            'flex flex-col gap-4'
          )}
        />
      </Pane>

      <Pane
        enter={currentStep === 4}
        currentStep={currentStep}
        header={`Join the waitlist`}
        copy={`Last question: how many bedrooms are you looking for?`}
        buttonCopy={buttonCopy}
        buttonType="submit"
        onBack={() => setCurrentStep(currentStep - 1)}
        className={currentStep !== 4 ? 'hidden' : ''}
      >
        <CheckboxPane
          fields={SIZES}
          fieldCode="tk"
          register={register}
          className={classNames(
            currentStep !== 4 ? 'hidden' : '',
            'flex flex-col gap-4'
          )}
        />
      </Pane>
    </div>
  )
}

export default MultiPaneInputs
