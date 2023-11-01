import type { FC } from 'react'
import { HTMLAttributes, useContext, useState } from 'react'
import classNames from 'classnames'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import {
  RichText as RichTextType,
  SanityImageAsset,
  UnitGroup,
} from '@studio/gen/sanity-schema'
import Pane from './Pane'
import { KeyedUnitProps } from '@components/unit'
import { SanityImage } from '@components/sanity'
import { HomeContext } from '@contexts/home'

interface UnitGroupContent extends Omit<UnitGroup, 'property'> {
  property?: {
    _id?: string
  }
}

interface PaneContentProps extends HTMLAttributes<HTMLElement> {
  unitGroups?: (UnitGroupContent & {
    _key: string
  })[]
  register: UseFormRegister<FieldValues>
}

interface MultiPaneInputsProps extends HTMLAttributes<HTMLElement> {
  header?: string
  copy?: RichTextType | string
  unitGroups?: (UnitGroupContent & {
    _key: string
  })[]
  buttonCopy?: string
  register: UseFormRegister<FieldValues>
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

const SIZES = [
  {
    label: 'Studio',
    name: 'studio',
  },
  {
    label: '1 Bedroom',
    name: 'n1_bedroom',
  },
  {
    label: '2 Bedrooms',
    name: 'n2_bedrooms',
  },
  {
    label: '3 Bedrooms +',
    name: 'n3_bedrooms_',
  },
]

const TIMELINE = [
  {
    label: 'Next 3 months',
  },
  {
    label: '3-6 Months',
  },
  {
    label: '6-12 Months',
  },
  {
    label: `I'm just browsing`,
  },
  {
    label: `I'm a realtor/broker`,
  },
]

const NameEmailPane: FC<PaneContentProps> = ({ register, className }) => {
  return (
    <div className={className}>
      <input
        type="text"
        id="first_name"
        className="input"
        placeholder="FIRST NAME"
        {...register('first_name', { required: true })}
      />
      <input
        type="text"
        id="last_name"
        className="input"
        placeholder="LAST NAME"
        {...register('last_name', { required: true })}
      />

      <input
        placeholder="YOUR EMAIL"
        type="email"
        id="email"
        className="input"
        {...register('email', { required: true })}
      />
    </div>
  )
}

const UnitsPane: FC<PaneContentProps> = ({
  unitGroups,
  onClick,
  register,
  className,
}) => {
  const { state } = useContext(HomeContext)
  const [showNextButton, setShowNextButton] = useState(true)
  console.log('unitGroups', unitGroups)
  if (state.property?._id) {
    console.log('state.property:', state.property)
    const index = unitGroups?.findIndex(
      ({ property }) => property?._id === state.property?._id
    )

    if (index) {
      const slicedGroups = unitGroups?.splice(index, 1)
      if (slicedGroups) unitGroups?.unshift(slicedGroups[0])
    }
  }

  return (
    <>
      <div className={classNames(className)}>
        {unitGroups &&
          unitGroups.map(({ _key, header, units }) => {
            return (
              <div key={_key} className="mb-y">
                {header && <p className="mb-2">{header}</p>}

                {units &&
                  units.map((unit: KeyedUnitProps, index) => {
                    return (
                      <div key={`${index}-${_key}`} className="relative mb-4">
                        <input
                          id={`unit-of-interest-${index}-${_key}`}
                          type="checkbox"
                          value={unit.title}
                          className="unit-checkbox"
                          checked={
                            state?.unit?.title === unit.title ? true : undefined
                          }
                          {...register('cities_of_interest', {
                            required: false,
                          })}
                        />
                        <label
                          htmlFor={`unit-of-interest-${index}-${_key}`}
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
                              asset={
                                unit.headlineImage.image
                                  .asset as SanityImageAsset
                              }
                              props={{
                                alt: unit.headlineImage.alt,
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
          className="sticky bottom-2 border-black left-0 animate-fadeInDelay opacity-0 w-full px-x md:px-xhalf tracking-normal h-btn tracking-caps uppercase text-black bg-gray text-center z-header"
          type="button"
          onClick={onClick}
        >
          {'Looking for something else?'}
        </button>
      )}
    </>
  )
}

const LocationsPane: FC<PaneContentProps> = ({ register, className }) => {
  const [hiddenInputShown, setHiddenInputShown] = useState(false)

  return (
    <div className={className}>
      {LOCATIONS.map(({ label, name }) => (
        <div className="mb-1" key={name}>
          <input
            type="checkbox"
            id={name}
            {...register(name, { required: false })}
          />
          <label className="text-left cursor-pointer" htmlFor={name}>
            {label}
          </label>
        </div>
      ))}
      <div className="mb-4" key={'Else'}>
        <input
          type="checkbox"
          id={'Else'}
          {...register('Else', {
            required: false,
            onChange: () => setHiddenInputShown(!hiddenInputShown),
          })}
        />
        <label className="text-left cursor-pointer" htmlFor={'Else'}>
          {`Somewhere else`}
        </label>
      </div>
      <input
        type="text"
        placeholder="WHERE?"
        {...register('City', { required: false })}
        className={classNames(hiddenInputShown ? 'mb-4' : 'hidden', 'input')}
      />

      <p className="uppercase my-yhalf">Where do you currently live?</p>
      <div className="flex gap-4 w-full uppercase">
        <input
          type="text"
          className="input w-1/2"
          placeholder="COUNTRY"
          {...register('current_country', { required: false })}
        />
        <input
          type="text"
          className="input w-1/2"
          placeholder="ZIP CODE"
          {...register('current_zip_code', { required: false })}
        />
      </div>
    </div>
  )
}

const MoreInfoPane: FC<PaneContentProps> = ({ register, className }) => {
  return (
    <div className={className}>
      {SIZES.map(({ label, name }) => (
        <div className="mb-1" key={name}>
          <input
            type="checkbox"
            id={name}
            {...register(name, { required: false })}
          />
          <label className="text-left cursor-pointer" htmlFor={name}>
            {label}
          </label>
        </div>
      ))}

      <p className="uppercase my-yhalf">When are you looking to buy?</p>
      <div className="flex flex-col gap-4 w-full">
        {TIMELINE.map(({ label }, index) => (
          <div className="mb-1" key={`timeline-key-${index}`}>
            <input
              type="radio"
              id={`timeline-${index}`}
              {...register('when_are_you_looking_to_buy', { required: false })}
            />
            <label
              className="text-left cursor-pointer"
              htmlFor={`timeline-${index}`}
            >
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export const MultiPaneInputs: FC<MultiPaneInputsProps> = ({
  header,
  copy,
  unitGroups,
  buttonCopy,
  register,
  className,
}) => {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className={classNames(className, 'w-full pr-menu')}>
      <Pane
        enter={currentStep === 0}
        currentStep={currentStep}
        header={header}
        copy={copy}
        buttonType={`button`}
        className={classNames(currentStep !== 0 ? 'hidden' : '')}
        onClick={() => setCurrentStep(currentStep + 1)}
      >
        <NameEmailPane
          register={register}
          className={classNames(
            currentStep !== 0 ? 'hidden' : '',
            'flex flex-col gap-4'
          )}
        />
      </Pane>

      <Pane
        enter={currentStep === 1}
        currentStep={currentStep}
        header={`Current Homes`}
        copy={`Select any homes you’re interested in to join the waitlist`}
        buttonType="submit"
        buttonCopy={buttonCopy}
        onBack={() => setCurrentStep(currentStep - 1)}
        className={currentStep !== 1 ? 'hidden' : ''}
      >
        <UnitsPane
          unitGroups={unitGroups}
          register={register}
          onClick={() => setCurrentStep(currentStep + 1)}
          className={classNames(
            currentStep !== 1 ? 'hidden' : '',
            'block mt-y uppercase'
          )}
        />
      </Pane>

      <Pane
        enter={currentStep === 2}
        currentStep={currentStep}
        header={`Where do you want to live?`}
        buttonCopy={`Next`}
        buttonType={`button`}
        onClick={() => setCurrentStep(currentStep + 1)}
        onBack={() => setCurrentStep(currentStep - 1)}
        className={currentStep !== 2 ? 'hidden' : ''}
      >
        <LocationsPane
          register={register}
          className={classNames(
            currentStep !== 2 ? 'hidden' : '',
            'flex flex-col gap-4 md:gap-3'
          )}
        />
      </Pane>

      <Pane
        enter={currentStep === 3}
        currentStep={currentStep}
        header={`What size are you looking for?`}
        buttonCopy={buttonCopy}
        buttonType="submit"
        onBack={() => setCurrentStep(currentStep - 1)}
        className={currentStep !== 3 ? 'hidden' : ''}
      >
        <MoreInfoPane
          register={register}
          className={classNames(
            currentStep !== 3 ? 'hidden' : '',
            'flex flex-col gap-4'
          )}
        />
      </Pane>
    </div>
  )
}

export default MultiPaneInputs
