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
  type?: 'checkbox' | 'radio'
}

interface PaneProps extends HTMLAttributes<HTMLElement> {
  register: UseFormRegister<FieldValues>
}

interface MultiPaneInputsProps extends HTMLAttributes<HTMLElement> {
  block?: boolean
  header?: string
  copy?: RichTextType | string
  buttonCopy?: string
  register: UseFormRegister<FieldValues>
  trigger: () => Promise<boolean>
  setFullWidth?: () => void
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
    name: 'lt5k',
  },
  {
    label: '$500,000 - $750,000',
    name: '5kto7.5k',
  },
  {
    label: '$750,000 - $1,000,000',
    name: '7.5kto1m',
  },
  {
    label: '$1,000,000 - $1,500,000',
    name: '1mto1.5m',
  },
  {
    label: '$1,500,000+',
    name: 'gt1.5m',
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

const NameEmailPane: FC<PaneProps> = ({ register, className }) => {
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
    </div>
  )
}

<<<<<<< HEAD
const LocationsPane: FC<PaneProps> = ({ register, className }) => {
=======
const UnitsPane: FC<PaneContentProps> = ({
  unitGroups,
  onClick,
  register,
  className,
}) => {
  const { state } = useContext(HomeContext)
  const [checkedUnitTitle, setCheckedUnitTitle] = useState('')
  const [checkedCount, setCheckedCount] = useState(0)
  const [showNextButton, setShowNextButton] = useState(true)
  const [unitOfInterestRequired, setUnitOfInterestRequired] = useState(true)
  if (state.property?._id) {
    const index = unitGroups?.findIndex(
      ({ property }) => property?._id === state.property?._id
    )

    if (index) {
      const slicedGroups = unitGroups?.splice(index, 1)
      if (slicedGroups) unitGroups?.unshift(slicedGroups[0])
    }
  }

  useEffect(() => {
    if (checkedCount === 0) setShowNextButton(true)
    if (state.unit?.title) setCheckedUnitTitle(state.unit?.title)
  }, [checkedCount, state?.unit?.title])

  return (
    <>
      <div className={classNames(className)}>
        {unitGroups &&
          unitGroups.map(({ header, units }, index) => {
            return (
              <div key={index} className="mb-y">
                {header && <p className="mb-2">{header}</p>}

                {units &&
                  units.map((unit: KeyedUnitProps, index) => {
                    return (
                      <div
                        key={`${index}-${unit._key}`}
                        className="relative mb-4"
                      >
                        <input
                          id={`unit-of-interest-${index}-${unit._id}`}
                          type="checkbox"
                          value={unit.title}
                          className="unit-checkbox"
                          {...register('units_interested', {
                            required: {
                              value: unitOfInterestRequired,
                              message: 'Please select at least one unit',
                            },
                          })}
                          onChange={e => {
                            setUnitOfInterestRequired(false)
                            e.target.checked
                              ? setCheckedCount(checkedCount + 1)
                              : setCheckedCount(checkedCount - 1)
                          }}
                        />
                        <label
                          htmlFor={`unit-of-interest-${index}-${unit._id}`}
                          onClick={() => setShowNextButton(false)}
                          className="checkbox-label flex justify-between relative py-4 pl-8 border-bottom cursor-pointer z-above"
                        >
                          <div>
                            <span className="block">{`${unit.propertyType?.typeTitle} ${unit.title}`}</span>
                            <span className="block">{unit.price}</span>
                            <span className="block">{unit.area}</span>
                          </div>
                          {unit.headlineImage && unit.headlineImage.image && (
                            <SanityImage
                              asset={unit.headlineImage.image.asset}
                              props={{
                                alt:
                                  unit.headlineImage.alt ||
                                  'Unit headline image',
                                width: 90,
                                height: 90,
                                quality: 1,
                                priority: false,
                              }}
                            />
                          )}
                        </label>
                      </div>
                    )
                  })}
              </div>
            )
          })}
      </div>

      {showNextButton && (
        <button
          className="sticky bottom-2 border-black left-0 animate-fadeInDelay opacity-0 w-full px-x md:px-xhalf tracking-details h-btn uppercase text-black bg-gray text-center z-header"
          type="button"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            setUnitOfInterestRequired(false)
            onClick && onClick(event)
          }}
        >
          {'Looking for something else?'}
        </button>
      )}
    </>
  )
}

const LocationsPane: FC<PaneContentProps> = ({ register, className }) => {
>>>>>>> main
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
          const triggerResult = await trigger()
          if (triggerResult) {
            setCurrentStep(currentStep + 1)
            setFullWidth && setFullWidth()
          }
        }}
      >
        <NameEmailPane
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
        copy={`What's your price range?`}
        buttonType="button"
        buttonCopy="Submit"
        onBack={() => setCurrentStep(currentStep - 1)}
        onClick={() => setCurrentStep(currentStep + 1)}
        className={currentStep !== 2 ? 'hidden' : ''}
      >
        <CheckboxPane
          fields={PRICES}
          fieldCode="price_range"
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
        copy={`When are you looking to buy?`}
        buttonCopy="Submit"
        buttonType="button"
        onClick={() => setCurrentStep(currentStep + 1)}
        onBack={() => setCurrentStep(currentStep - 1)}
        className={currentStep !== 3 ? 'hidden' : ''}
      >
        <CheckboxPane
          fields={TIMELINE}
          type={'radio'}
          fieldCode="buyingtimelinedec2023"
          register={register}
          className={classNames(
            currentStep !== 3 ? 'hidden' : '',
            'flex flex-col gap-4 h-[320px]'
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
          fieldCode="bedroom_preference"
          register={register}
          className={classNames(
            currentStep !== 4 ? 'hidden' : '',
            'flex flex-col gap-4 h-[292px] md:h-[320px]'
          )}
        />
      </Pane>
    </div>
  )
}

export default MultiPaneInputs
