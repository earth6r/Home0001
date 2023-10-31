import type { FC } from 'react'
import { HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form'
import {
  RichText as RichTextType,
  SanityImageAsset,
  UnitGroup,
} from '@studio/gen/sanity-schema'
import Pane from './Pane'
import { KeyedUnitProps } from '@components/unit'
import { SanityImage } from '@components/sanity'

interface PaneProps extends HTMLAttributes<HTMLElement> {
  unitGroups?: (UnitGroup & {
    _key: string
  })[]
  register: UseFormRegister<FieldValues>
}

interface MultiPaneInputsProps extends HTMLAttributes<HTMLElement> {
  header?: string
  copy?: RichTextType | string
  unitGroups?: (UnitGroup & {
    _key: string
  })[]
  buttonCopy?: string
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

const NameEmailPane: FC<PaneProps> = ({ register, className }) => {
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

const UnitsPane: FC<PaneProps> = ({ unitGroups, register, className }) => {
  return (
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
                        {...register('cities_of_interest', {
                          required: false,
                        })}
                      />
                      <label
                        htmlFor={`unit-of-interest-${index}-${_key}`}
                        className="checkbox-label flex justify-between relative p-4 z-above"
                      >
                        <div>
                          <span className="block">{`${unit.propertyType?.typeTitle} ${unit.title}`}</span>
                          <span className="block">{unit.price}</span>
                          <span className="block">{unit.area}</span>
                        </div>
                        {unit.headlineImage && unit.headlineImage.image && (
                          <SanityImage
                            asset={
                              unit.headlineImage.image.asset as SanityImageAsset
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
  )
}

const LocationsPane: FC<PaneProps> = ({ register, className }) => {
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

const MoreInfoPane: FC<PaneProps> = ({ register, className }) => {
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
  className,
}) => {
  const { register } = useForm({
    shouldUseNativeValidation: true,
  })
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className={classNames(className, 'w-full pr-menu')}>
      <Pane
        header={header}
        copy={copy}
        buttonType={`button`}
        buttonCopy={`Next`}
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
        header={`Current Homes`}
        copy={`Select any homes you’re interested in to join the waitlist`}
        buttonType="submit"
        buttonCopy={buttonCopy}
        className={currentStep !== 1 ? 'hidden' : ''}
      >
        <UnitsPane
          unitGroups={unitGroups}
          register={register}
          className={classNames(
            currentStep !== 1 ? 'hidden' : '',
            'block mt-y uppercase'
          )}
        />
        {currentStep === 1 && (
          <button
            className="sticky bottom-2 border-black left-0 animate-fadeInDelay opacity-0 w-full px-x md:px-xhalf tracking-normal h-btn tracking-caps uppercase text-black bg-gray text-center z-header"
            type="button"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            {'Looking for something else?'}
          </button>
        )}
      </Pane>

      <Pane
        header={`Where do you want to live?`}
        buttonCopy={`Next`}
        buttonType={`button`}
        onClick={() => setCurrentStep(currentStep + 1)}
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
        header={`What size are you looking for?`}
        buttonCopy={buttonCopy}
        buttonType="submit"
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