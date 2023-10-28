import type { FC } from 'react'
import { HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form'
import { RichText as RichTextType, UnitGroup } from '@studio/gen/sanity-schema'
import Pane from './Pane'
import { KeyedUnitProps } from '@components/unit'

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
    label: 'Paris (coming soon)',
    name: 'Paris',
  },
  {
    label: 'London (coming soon)',
    name: 'London',
  },
  {
    label: 'Berlin (coming soon)',
    name: 'Berlin',
  },
  {
    label: 'Mexico City (coming soon)',
    name: 'CDMX',
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
    <div>
      {unitGroups &&
        unitGroups.map(({ _key, header, units }) => {
          return (
            <>
              {header && <p>{header}</p>}

              {units &&
                units.map((unit: KeyedUnitProps) => {
                  return (
                    <input
                      key={_key}
                      type="checkbox"
                      value={unit.title}
                      {...register('unit_of_interest', { required: false })}
                    />
                  )
                })}
            </>
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
        <div className="mb-1 md:mb-4" key={name}>
          <input
            type="checkbox"
            id={name}
            {...register(name, { required: false })}
          />
          <label
            className="text-left ml-x md:ml-xhalf cursor-pointer"
            htmlFor={name}
          >
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
        <label
          className="text-left ml-x md:ml-xhalf cursor-pointer"
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

const MoreInfoPane: FC<PaneProps> = ({ register, className }) => {
  return (
    <div>
      {/* <input
            type="hidden"
            value={state.unit?.title}
            {...register('unit_of_interest', { required: false })}
          /> */}
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
        buttonCopy={`Next`}
        className={currentStep !== 0 ? 'hidden' : ''}
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
        buttonType={`submit`}
        buttonCopy={buttonCopy}
        className={currentStep !== 1 ? 'hidden' : ''}
      >
        <UnitsPane
          unitGroups={unitGroups}
          register={register}
          className={classNames(
            currentStep !== 1 ? 'hidden' : '',
            'flex flex-row gap-4'
          )}
        />
      </Pane>

      <Pane
        header={`Where do you want to live?`}
        buttonCopy={`Next`}
        buttonType={`button`}
        className={currentStep !== 2 ? 'hidden' : ''}
      >
        <LocationsPane
          register={register}
          className={classNames(
            currentStep !== 2 ? 'hidden' : '',
            'flex flex-row gap-4'
          )}
        />
      </Pane>

      <Pane
        header={`What size are you looking for?`}
        buttonCopy={`Next`}
        buttonType={`button`}
        className={currentStep !== 3 ? 'hidden' : ''}
      >
        <MoreInfoPane
          register={register}
          className={classNames(
            currentStep !== 3 ? 'hidden' : '',
            'flex flex-row gap-4'
          )}
        />
      </Pane>
    </div>
  )
}

export default MultiPaneInputs
