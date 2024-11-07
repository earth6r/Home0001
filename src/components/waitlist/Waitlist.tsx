import {
  type FC,
  HTMLAttributes,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react'
import classNames from 'classnames'
import {
  FieldValues,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form'
import { Form, MultiPaneInputs, SinglePaneInputs } from '@components/form'
import { RichText } from '@components/sanity'
import { HomeContext } from '@contexts/home'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'

interface WaitlistProps extends HTMLAttributes<HTMLDivElement> {
  formType?: 'modal' | 'unit'
  waitlist: {
    header?: string
    text?: RichTextType | string
    id?: string
    successMessage?: RichTextType
    consentCopy?: RichTextType
    showConsent?: boolean
  }
  formActions: {
    isSubmitting: boolean
    formSubmitted: boolean
    setFormSubmitted: Dispatch<SetStateAction<boolean>>
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
    trigger: UseFormTrigger<FieldValues>
    register: UseFormRegister<FieldValues>
    getValues: UseFormGetValues<FieldValues>
  }
  setFullWidth?: () => void
  fullWidth?: boolean
  broker?: boolean
  formPanes?: string[]
}

export const Waitlist: FC<WaitlistProps> = ({
  id,
  formType = 'modal',
  waitlist,
  formActions,
  fullWidth,
  formPanes,
  setFullWidth,
  className,
}) => {
  const { state } = useContext(HomeContext)

  return (
    <div id={id} className={classNames(className)}>
      <div
        className={classNames(
          formType === 'unit'
            ? 'md:h-[659px] pb-y md:pb-ydouble'
            : waitlist.showConsent
            ? 'h-[720px]'
            : 'h-[630px]',
          'pl-x pr-[calc(var(--space-menu)+var(--space-x))] pb-ydouble md:px-xdouble md:pb-[56px] pt-ydouble bg-yellow'
        )}
      >
        {formType === 'unit' && (
          <>
            <h2 className="text-h3 md:pr-menu lg:pr-fullmenu">
              {formActions.formSubmitted
                ? (waitlist?.successMessage as unknown as string) || `Thanks!`
                : `Inquire`}
            </h2>

            <p className="my-ydouble text-md font-sansText max-w-[var(--btn-width)]">
              {formActions.formSubmitted
                ? `We’ll be in touch with information on ${state.unit?.title} and on how to schedule a tour.`
                : (waitlist.text && (
                    <RichText
                      className="bold"
                      blocks={waitlist.text as RichTextType}
                    />
                  )) ||
                  `For more information and to schedule a tour:`}
            </p>
          </>
        )}

        {formType === 'unit' ? (
          <>
            {!formActions.formSubmitted && (
              <Form
                formType={formType}
                audienceId={waitlist?.id}
                formSubmitted={formActions.formSubmitted}
                handleSubmit={formActions.handleSubmit}
                setFormSubmitted={formActions.setFormSubmitted}
                className="w-full"
              >
                <SinglePaneInputs
                  isSubmitting={formActions.isSubmitting}
                  fields={{ showName: true, showPhone: true }}
                  register={formActions.register}
                  modal={true}
                  className={classNames('h-full md:pr-menu')}
                />
              </Form>
            )}
          </>
        ) : (
          <Form
            formType={formType}
            audienceId={waitlist?.id}
            formSubmitted={formActions.formSubmitted}
            handleSubmit={formActions.handleSubmit}
            setFormSubmitted={formActions.setFormSubmitted}
            successMessage={waitlist?.successMessage}
            className="w-full h-full"
            isHomeBlock={true}
          >
            <MultiPaneInputs
              block={true}
              formPanes={formPanes}
              setFullWidth={setFullWidth}
              header={waitlist?.header}
              copy={waitlist?.text}
              buttonCopy="Join waitlist"
              showConsent={waitlist?.showConsent}
              consentCopy={waitlist?.consentCopy}
              isSubmitting={formActions.isSubmitting}
              register={formActions.register}
              className={classNames(
                fullWidth ? '' : 'md:max-w-[1050px] md:pr-menu',
                'h-full leading-[0.85]'
              )}
              trigger={formActions.trigger}
              formValues={formActions.getValues}
            />
          </Form>
        )}
      </div>
    </div>
  )
}

export default Waitlist
