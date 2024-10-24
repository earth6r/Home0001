import type { FC } from 'react'
import { useState } from 'react'
import classNames from 'classnames'
import type { FormBlock as FormBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'
import { Controller, useForm } from 'react-hook-form'
import { Form } from '@components/form'
import Pane from '@components/form/Pane'
import { TypedObject } from 'sanity'
import IconChevron from '@components/icons/IconChevron'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

type FormBlockProps = Omit<SanityBlockElement, keyof FormBlockType> &
  FormBlockType

export const FormBlock: FC<FormBlockProps> = ({
  header,
  panes,
  urlSubmit,
  audienceId,
  successMessage,
  backgroundColor,
  className,
}) => {
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <Block className={classNames(className)}>
      {header && (
        <RichText blocks={header} className="mb-y text-left md:text-center" />
      )}

      <div
        className={classNames(
          backgroundColor === 'yellow' ? 'bg-yellow' : '',
          'grid grid-cols-1 md:grid-cols-3 relative w-[calc(100%+var(--space-x)*2)] min-h-[660px] -left-x py-ydouble px-x'
        )}
      >
        <div className="md:col-start-2">
          {formSubmitted ? (
            <RichText
              blocks={
                successMessage ||
                ('Thanks for your submission' as unknown as TypedObject)
              }
            />
          ) : (
            <Form
              formType="block"
              actionUrl={urlSubmit}
              audienceId={audienceId}
              formSubmitted={formSubmitted}
              handleSubmit={handleSubmit}
              setFormSubmitted={setFormSubmitted}
              className="w-full"
            >
              {panes &&
                panes.length > 0 &&
                panes.map((pane, index) => (
                  <Pane
                    key={`${pane}-${index}`}
                    block={true}
                    largeHeader={true}
                    padding={false}
                    enter={currentStep === 0}
                    currentStep={currentStep}
                    header={pane.header}
                    copy={pane.copy}
                    isSubmitting={isSubmitting}
                    buttonType={
                      index === panes.length - 1 ? 'submit' : `button`
                    }
                    className={
                      (classNames(currentStep !== 0 ? 'hidden' : ''), 'w-full')
                    }
                    onClick={() =>
                      index < panes.length - 1 &&
                      setCurrentStep(currentStep + 1)
                    }
                  >
                    {pane.formFields?.map((field, i) => (
                      <div key={`${field}-${i}`}>
                        {field.fieldType === 'tel' && (
                          <div>
                            <Controller
                              control={control}
                              rules={{
                                validate: (value = '') =>
                                  isValidPhoneNumber(value),
                              }}
                              {...register('phone')}
                              render={({ field: { onChange, value } }) => (
                                <PhoneInput
                                  value={value}
                                  onChange={onChange}
                                  defaultCountry="US"
                                  placeholder="PHONE NUMBER"
                                  id="phone"
                                  className="input mb-y"
                                />
                              )}
                            />
                            <div>
                              {errors.phone && (
                                <p className="mb-y text-button text-red-600 leading-loose">
                                  Invalid Phone Number: Please select the
                                  country code from the dropdown and do not
                                  include any spaces.
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                        {(field.fieldType === 'text' ||
                          field.fieldType === 'email' ||
                          field.fieldType === 'hidden') && (
                          <input
                            type={field.fieldType}
                            id={field.fieldId}
                            className="input"
                            placeholder={field.placeholder}
                            {...register(field.fieldId as string, {
                              required: field.isRequired
                                ? `${field.placeholder} is required`
                                : false,
                              pattern:
                                field.fieldType === 'email'
                                  ? {
                                      value: /\S+@\S+\.\S+/,
                                      message: 'Please enter a valid email',
                                    }
                                  : undefined,
                            })}
                          />
                        )}

                        {field.fieldType === 'textArea' && (
                          <textarea
                            rows={field.rows}
                            id={field.fieldId}
                            className="input"
                            placeholder={field.placeholder}
                            {...register(field.fieldId as string, {
                              required: field.isRequired
                                ? `${field.placeholder} is required`
                                : false,
                            })}
                          />
                        )}

                        {field.fieldType === 'select' && (
                          <div className="flex flex-col gap-yhalf relative">
                            <label
                              htmlFor={field.fieldId}
                              className="text-left text-md"
                            >
                              {field.optionsLabel}
                            </label>
                            <select
                              className="input select text-button font-sans"
                              {...register(field.fieldId as string, {
                                required: field.isRequired
                                  ? 'Input required'
                                  : false,
                              })}
                            >
                              {field.options?.map((option, i) => (
                                <option
                                  key={`option${field.fieldId}-${i}`}
                                  value={option.value}
                                  id={option.id}
                                >
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <IconChevron className="absolute w-[12px] right-x bottom-[18px] transform rotate-90" />
                          </div>
                        )}
                      </div>
                    ))}
                  </Pane>
                ))}
            </Form>
          )}
        </div>
      </div>
    </Block>
  )
}

export default FormBlock
