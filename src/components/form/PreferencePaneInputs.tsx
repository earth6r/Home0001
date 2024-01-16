import type { FC } from 'react'
import { useState } from 'react'
import classNames from 'classnames'
import PreferencePane from './PreferencePane'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import {
  LOCATIONS,
  SIZES,
  AMENITIES,
  PRICES,
  TIMELINE,
  SELLINGHOME,
  FINANCING,
} from './PreferenceData'
import {
  PreferenceSubmitButtonProps,
  PaneProps,
  CheckboxPaneProps,
  PreferencePaneInputsProps,
} from './types'

const PreferenceSubmitButton: FC<PreferenceSubmitButtonProps> = ({
  onClick,
  buttonType,
  className,
}) => {
  return (
    <div className={className}>
      <button
        className="flex justify-between items-center w-full px-x md:px-xhalf tracking-details h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
        type={buttonType || `button`}
        onClick={onClick}
      >
        {`Submit`}
        <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
      </button>
    </div>
  )
}

const NameEmailPane: FC<PaneProps> = ({ register, className, onClick }) => {
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

      <PreferenceSubmitButton
        onClick={onClick}
        className="flex w-full h-btn mt-6 md:bottom-auto md:pr-menu order-1"
      />
    </div>
  )
}

const LocationsPane: FC<PaneProps> = ({
  register,
  className,
  onClick,
  onBack,
}) => {
  const [hiddenInputShown, setHiddenInputShown] = useState(false)
  return (
    <div className={className}>
      <p className="mb-ylg text-md font-medium">
        Where do you want to own a 0001 home?
      </p>
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
      <p className="mb-ylg text-md font-medium">
        What are your prefered neighborhoods?
      </p>
      <input
        type="text"
        placeholder="Prefered Neighborhoods"
        {...register('what_are_your_preferred_neighborhoods_', {
          required: false,
        })}
        className={classNames('waitlist input -mt-[15px] mb-10')}
      />
      <p className="mb-ylg text-md font-medium">
        What would be the ideal size?
      </p>
      {SIZES.map(({ label, name }: any) => (
        <div key={name}>
          <input
            type={'radio'}
            value={name}
            id={name}
            {...register('bedroom_preference', { required: false })}
          />
          <label
            className="text-left cursor-pointer font-medium text-md"
            htmlFor={name}
          >
            {label}
          </label>
        </div>
      ))}
      <div
        className={classNames(
          'flex w-full h-btn mt-6 md:bottom-auto md:pr-menu order-1'
        )}
      >
        <button
          className="relative flex justify-center items-center w-[48px] h-btn mr-2 bg-white border-black z-above"
          type={'button'}
          onClick={onBack}
        >
          <IconSmallArrow
            width="13"
            height="9"
            fill="black"
            className="transform rotate-180"
          />
        </button>

        <PreferenceSubmitButton onClick={onClick} className="w-full" />
      </div>
    </div>
  )
}

const HomeTypesPane: FC<PaneProps> = ({
  register,
  className,
  onBack,
  onClick,
}) => {
  const [hiddenInput1Shown, setHiddenInput1Shown] = useState(false)
  const [hiddenInput2Shown, setHiddenInput2Shown] = useState(false)

  return (
    <div className={className}>
      <p className="mb-ylg text-md font-medium">
        What kind of home are you looking for?
      </p>
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
          id={'OtherHome'}
          {...register('OtherHome', {
            required: false,
            onChange: () => setHiddenInput1Shown(!hiddenInput1Shown),
          })}
        />
        <label
          className="text-left cursor-pointer font-medium text-md"
          htmlFor={'OtherHome'}
        >
          {'Other:'}
        </label>
      </div>

      <input
        type="text"
        placeholder="Other Home Type"
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
          id={'otherPrimary'}
          {...register('otherPrimary', {
            required: false,
            onChange: () => setHiddenInput2Shown(!hiddenInput2Shown),
          })}
        />
        <label
          className="text-left cursor-pointer font-medium text-md"
          htmlFor={'otherPrimary'}
        >
          {'Other'}
        </label>
      </div>
      <input
        type="text"
        placeholder="Property Purpose"
        {...register('primaryorsecondaryother', { required: false })}
        className={classNames(
          hiddenInput2Shown ? '' : 'opacity-0',
          'waitlist input mb-4'
        )}
      />
      <div
        className={classNames(
          'flex w-full h-btn mt-6 md:bottom-auto md:pr-menu order-1'
        )}
      >
        <button
          className="relative flex justify-center items-center w-[48px] h-btn mr-2 bg-white border-black z-above"
          type={'button'}
          onClick={onBack}
        >
          <IconSmallArrow
            width="13"
            height="9"
            fill="black"
            className="transform rotate-180"
          />
        </button>

        <PreferenceSubmitButton onClick={onClick} className="w-full" />
      </div>
    </div>
  )
}

const ScheduleCallPane: FC<PaneProps> = ({}) => {
  return (
    <a href="calendly.com/tourlower-east-side0001/schedulecall" target="_blank">
      Schedule a call
    </a>
  )
}
const FinancingRadioPane: FC<PaneProps> = ({
  register,
  className,
  onBack,
  onClick,
}) => {
  return (
    <div className={classNames(className)}>
      <p className="mb-ylg text-md font-medium">
        Would you like our support to help with financing?
      </p>
      {FINANCING.map(({ label, name }: any) => (
        <div key={name}>
          <input
            type={'radio'}
            value={name}
            id={name}
            {...register('purchase_type', {
              required: false,
            })}
          />
          <label
            className="text-left cursor-pointer font-medium text-md"
            htmlFor={name}
          >
            {label}
          </label>
        </div>
      ))}
      <br></br>
      <p className="mb-ylg text-md font-medium">
        Would you like help selling your current home?
      </p>
      {SELLINGHOME.map(({ label, name }: any) => (
        <div key={name}>
          <input
            type={'radio'}
            value={name}
            id={name}
            {...register('would_you_like_help_selling_your_current_home_', {
              required: false,
            })}
          />
          <label
            className="text-left cursor-pointer font-medium text-md"
            htmlFor={name}
          >
            {label}
          </label>
        </div>
      ))}
      <div
        className={classNames(
          'flex w-full h-btn mt-6 md:bottom-auto md:pr-menu order-1'
        )}
      >
        <button
          className="relative flex justify-center items-center w-[48px] h-btn mr-2 bg-white border-black z-above"
          type={'button'}
          onClick={onBack}
        >
          <IconSmallArrow
            width="13"
            height="9"
            fill="black"
            className="transform rotate-180"
          />
        </button>

        <PreferenceSubmitButton
          onClick={onClick}
          buttonType={'submit'}
          className="w-full"
        />
      </div>
    </div>
  )
}
const CheckboxPaneAmenities: FC<CheckboxPaneProps> = ({
  fields,
  fieldCode,
  type,
  register,
  className,
  onBack,
  onClick,
}) => {
  return (
    <div className={classNames(className)}>
      <p className="mb-ylg text-md font-medium">
        Which amenities are most important to you? (Select all that apply)
      </p>
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
      <br></br>
      <p className="mb-ylg text-md font-medium">
        {"So, what's your price range?"}
      </p>
      {PRICES.map(({ label, name }: any) => (
        <div key={name}>
          <input
            type={'checkbox'}
            value={name}
            id={name}
            {...register('price_range', { required: false })}
          />
          <label
            className="text-left cursor-pointer font-medium text-md"
            htmlFor={name}
          >
            {label}
          </label>
        </div>
      ))}
      <br></br>
      <p className="mb-ylg text-md font-medium">
        {"And what's your timeline?"}
      </p>
      {TIMELINE.map(({ label, name }: any) => (
        <div key={name}>
          <input
            type={'radio'}
            value={name}
            id={name}
            {...register('buyingtimelinedec2023', { required: false })}
          />
          <label
            className="text-left cursor-pointer font-medium text-md"
            htmlFor={name}
          >
            {label}
          </label>
        </div>
      ))}
      <div
        className={classNames(
          'flex w-full h-btn mt-6 md:bottom-auto md:pr-menu order-1'
        )}
      >
        <button
          className="relative flex justify-center items-center w-[48px] h-btn mr-2 bg-white border-black z-above"
          type={'button'}
          onClick={onBack}
        >
          <IconSmallArrow
            width="13"
            height="9"
            fill="black"
            className="transform rotate-180"
          />
        </button>

        <PreferenceSubmitButton onClick={onClick} className="w-full" />
      </div>
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
      >
        <NameEmailPane
          broker={broker === false ? false : block}
          register={register}
          onClick={async () => {
            const triggerResult = await trigger()
            if (triggerResult) {
              setCurrentStep(currentStep + 1)
              setFullWidth && setFullWidth()
            }
          }}
          className={classNames('flex flex-col gap-3 md:h-auto')}
        />
      </PreferencePane>

      <PreferencePane
        enter={currentStep === 1}
        currentStep={currentStep}
        header={`Update Preferences`}
        copy={'Page 2 of 5'}
        buttonCopy={`Submit`}
        buttonType={`button`}
        onClick={() => setCurrentStep(currentStep + 1)}
        onBack={() => {
          setFullWidth && setFullWidth()
          setCurrentStep(currentStep - 1)
        }}
        className={currentStep !== 1 ? 'hidden' : ''}
      >
        <HomeTypesPane
          register={register}
          onBack={() => {
            setCurrentStep(currentStep - 1)
            setFullWidth && setFullWidth()
          }}
          onClick={() => setCurrentStep(currentStep + 1)}
          className={classNames(
            currentStep !== 1 ? 'hidden' : '',
            'flex flex-col gap-4'
          )}
        />
      </PreferencePane>
      <PreferencePane
        enter={currentStep === 2}
        currentStep={currentStep}
        header={`Update Preferences`}
        copy={'Page 3 of 5'}
        buttonCopy={`Submit`}
        buttonType={`button`}
        onClick={() => setCurrentStep(currentStep + 1)}
        onBack={() => setCurrentStep(currentStep - 1)}
        className={currentStep !== 2 ? 'hidden' : ''}
      >
        <LocationsPane
          register={register}
          onClick={() => setCurrentStep(currentStep + 1)}
          onBack={() => setCurrentStep(currentStep - 1)}
          className={classNames(
            currentStep !== 2 ? 'hidden' : '',
            'flex flex-col gap-4'
          )}
        />
      </PreferencePane>

      <PreferencePane
        enter={currentStep === 3}
        currentStep={currentStep}
        header={`Update Preferences`}
        copy={`Step 4 of 5`}
        buttonCopy="Submit"
        buttonType="button"
        onClick={() => setCurrentStep(currentStep + 1)}
        onBack={() => setCurrentStep(currentStep - 1)}
        className={currentStep !== 3 ? 'hidden' : ''}
      >
        <CheckboxPaneAmenities
          fields={AMENITIES}
          type={'checkbox'}
          fieldCode="which_amenities_are_most_important_to_you_"
          register={register}
          onClick={() => setCurrentStep(currentStep + 1)}
          onBack={() => setCurrentStep(currentStep - 1)}
          className={classNames(
            currentStep !== 3 ? 'hidden' : '',
            'flex flex-col gap-4 '
          )}
        />
      </PreferencePane>
      <PreferencePane
        enter={currentStep === 4}
        currentStep={currentStep}
        header={`Update Preferences`}
        copy={`Step 5 of 5`}
        className={currentStep !== 4 ? 'hidden' : ''}
      >
        <FinancingRadioPane
          register={register}
          onClick={() => setCurrentStep(currentStep + 1)}
          onBack={() => setCurrentStep(currentStep - 1)}
          className={classNames(
            currentStep !== 4 ? 'hidden' : '',
            'flex flex-col gap-4 '
          )}
        />
      </PreferencePane>
    </div>
  )
}

export default PreferencePaneInputs
