import type { FC } from 'react'
import { HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { RichText as RichTextType, UnitGroup } from '@studio/gen/sanity-schema'
import Pane from './Pane'
import PreferencePane from './Pane'
import { useBrokerInquiryModal } from '@contexts/modals'
import { sendGoogleEvent } from '@lib/util'
import { submitForm } from '@lib/util'

interface CheckboxPaneProps extends PaneProps {
  fieldCode: string
  fields: { label?: string; name?: string }[]
  type?: 'checkbox' | 'radio'
}

interface PaneProps extends HTMLAttributes<HTMLElement> {
  register: UseFormRegister<FieldValues>
  broker?: boolean
}

interface PreferencePaneInputsProps extends HTMLAttributes<HTMLElement> {
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
        // !to fix{...register('first_name', { required: 'First name is required' })}
        {...register('first_name', { required: false })}
      />
      <input
        type="text"
        id="last_name"
        className="waitlist input"
        placeholder="LAST NAME"
        // ! to replace{...register('last_name', { required: 'Last name is required' })}
        {...register('last_name', { required: false })}
      />
      <input
        placeholder="YOUR EMAIL"
        type="email"
        id="email"
        className="waitlist input"
        {...register('email', {
          required: false,
        })}
        // {...register('email', {
        //   required: 'Email is required',
        //   pattern: {
        //     value: /\S+@\S+\.\S+/,
        //     message: 'Please enter a valid email',
        //   },
        // })}
      />
      <input
        type="text"
        id="city"
        className="waitlist input"
        placeholder="CURRENT CITY (OPTIONAL)"
        {...register('city', { required: false })}
      />
      <input
        type="text"
        id="country"
        className="waitlist input"
        placeholder="CURRENT COUNTRY (OPTIONAL)"
        {...register('country', { required: false })}
      />
      <input
        type="text"
        id="zip"
        className="waitlist input"
        placeholder="CURRENT ZIP (OPTIONAL)"
        {...register('zip', { required: false })}
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
        className={classNames(
          hiddenInputShown ? '' : 'opacity-0',
          'waitlist input mb-4'
        )}
      />
    </div>
  )
}
const HomeTypesPane: FC<PaneProps> = ({ register, className }) => {
  const [hiddenInput1Shown, setHiddenInput1Shown] = useState(false)
  const [hiddenInput2Shown, setHiddenInput2Shown] = useState(false)

  return (
    <div className={className}>
      <div>
        <input
          type="checkbox"
          value={'Apt-condo'}
          id={'Apt-condo'}
          {...register('what_kind_of_home_are_you_looking_for_', {
            required: false,
          })}
        />
        <label
          className="text-left cursor-pointer font-medium text-md"
          htmlFor={'Apt-condo'}
        >
          {'Apartment / Condo'}
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          value={'Sfh'}
          id={'Sfh'}
          {...register('what_kind_of_home_are_you_looking_for_', {
            required: false,
          })}
        />
        <label
          className="text-left cursor-pointer font-medium text-md"
          htmlFor={'Sfh'}
        >
          {'House / Single Family Home'}
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          value={'Other'}
          id={'Other'}
          {...register('what_kind_of_home_are_you_looking_for_', {
            required: false,
            onChange: () => setHiddenInput1Shown(!hiddenInput1Shown),
          })}
        />
        <label
          className="text-left cursor-pointer font-medium text-md"
          htmlFor={'Other'}
        >
          {'Other:'}
        </label>
      </div>

      <input
        type="text"
        placeholder="Other Home Type?"
        {...register('home_type', { required: false })}
        className={classNames(
          hiddenInput1Shown ? '' : 'opacity-0',
          'waitlist input mb-4'
        )}
      />

      <p className="mb-ylg text-md font-medium">
        Will it be your primary residence?
      </p>
      <div>
        <input
          type="checkbox"
          value={'Primary'}
          id={'Primary'}
          {...register('will_this_be_your_primary_home_', {
            required: false,
          })}
        />
        <label
          className="text-left cursor-pointer font-medium text-md"
          htmlFor={'Primary'}
        >
          {'Yes, primary residence'}
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          value={'Secondary'}
          id={'Secondary'}
          {...register('will_this_be_your_primary_home_', {
            required: false,
          })}
        />
        <label
          className="text-left cursor-pointer font-medium text-md"
          htmlFor={'Secondary'}
        >
          {'No, secondary residence / vacation home / Pied-a-Terre'}
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          value={'Secondary-else'}
          id={'Secondary-else'}
          {...register('will_this_be_your_primary_home_', {
            required: false,
          })}
        />
        <label
          className="text-left cursor-pointer font-medium text-md"
          htmlFor={'Secondary-else'}
        >
          {'No, buying for someone else (like a family member)'}
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          value={'Secondary-rental'}
          id={'Secondary-rental'}
          {...register('will_this_be_your_primary_home_', {
            required: false,
          })}
        />
        <label
          className="text-left cursor-pointer font-medium text-md"
          htmlFor={'Secondary-rental'}
        >
          {'No, buying as a rental / investment property'}
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          value={'Other'}
          id={'Other'}
          {...register('will_this_be_your_primary_home_', {
            required: false,
            onChange: () => setHiddenInput2Shown(!hiddenInput2Shown),
          })}
        />
        <label
          className="text-left cursor-pointer font-medium text-md"
          htmlFor={'Other'}
        >
          {'Other'}
        </label>
        <input
          type="text"
          placeholder="Property Purpose?"
          {...register('primaryorsecondaryother', { required: false })}
          className={classNames(
            hiddenInput2Shown ? '' : 'opacity-0',
            'waitlist input mb-4'
          )}
        />
      </div>
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

export const PreferencePaneInputs: FC<PreferencePaneInputsProps> = ({
  block,
  header,
  copy,
  buttonCopy,
  formPanes,
  broker,
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
      <PreferencePane
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
          //todo: should we move form ID to sanity for this one?
          const form_ID = 'e44ec9f1-928b-429b-8293-0b561d7b64b5'
          //   await submitForm(formData, form_ID, 'started_submit')
          const triggerResult = await trigger()
          if (triggerResult) {
            setCurrentStep(currentStep + 1)
            setFullWidth && setFullWidth()
          }
        }}
      >
        <NameEmailPane
          broker={broker === false ? false : block}
          register={register}
          className={classNames(
            currentStep !== 0 ? 'hidden' : '',
            block ? 'h-[220px]' : '',
            'flex flex-col gap-3 md:h-auto'
          )}
        />
      </PreferencePane>

      <PreferencePane
        enter={currentStep === 1}
        currentStep={currentStep}
        header={`Update Preferences`}
        copy={'What kind of home are you looking for?'}
        buttonCopy={`Submit`}
        buttonType={`button`}
        onClick={() => setCurrentStep(currentStep + 1)}
        onBack={() => setCurrentStep(currentStep - 1)}
        className={currentStep !== 1 ? 'hidden' : ''}
      >
        <HomeTypesPane
          register={register}
          className={classNames(
            currentStep !== 1 ? 'hidden' : '',
            'flex flex-col gap-4 h-[320px]'
          )}
        />
      </PreferencePane>
      {/* <Pane
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
      </Pane> */}

      <PreferencePane
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
      </PreferencePane>

      <PreferencePane
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
      </PreferencePane>
    </div>
  )
}

export default PreferencePaneInputs
