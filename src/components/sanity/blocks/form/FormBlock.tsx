import type { FC } from 'react'
import { useState } from 'react'
import classNames from 'classnames'
import type { FormBlock as FormBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'
import { useForm } from 'react-hook-form'
import { Form } from '@components/form'
import type { RichText as RichTextType } from '@studio/gen/sanity-schema'
import Pane from '@components/form/Pane'
import { TypedObject } from 'sanity'

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
    formState: { isSubmitting },
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
                        {(field.fieldType === 'text' ||
                          field.fieldType === 'email' ||
                          field.fieldType === 'tel' ||
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
                          <div className="flex flex-col gap-yhalf">
                            <label
                              htmlFor={field.fieldId}
                              className="text-left text-md"
                            >
                              {field.optionsLabel}
                            </label>
                            {field.options?.map((option, i) => (
                              <div key={`option${field.fieldId}-${i}`}>
                                <input
                                  type={field.selectType}
                                  value={option.value}
                                  id={option.id}
                                  {...register(field.fieldId as string, {
                                    required: field.isRequired
                                      ? 'Input required'
                                      : false,
                                  })}
                                />
                                <label
                                  className="text-left cursor-pointer font-medium text-md"
                                  htmlFor={option.id}
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
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
