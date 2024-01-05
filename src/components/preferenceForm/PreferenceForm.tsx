import { type FC, HTMLAttributes, Dispatch, SetStateAction } from 'react'
import classNames from 'classnames'
import { RichText } from '@studio/gen/sanity-schema'
import {
  FieldValues,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form'
import { Form, PreferencePaneInputs } from '@components/form'

interface PreferenceProps extends HTMLAttributes<HTMLDivElement> {
  waitlist: {
    header?: string
    text?: RichText | string
    id?: string
    successMessage?: RichText
  }
  formActions: {
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

export const PreferenceForm: FC<PreferenceProps> = ({
  waitlist,
  formActions,
  fullWidth,
  formPanes,
  broker = true,
  setFullWidth,
  className,
}) => {
  return (
    <div className={classNames(className)}>
      <div className="pl-x pr-[calc(var(--space-menu)+var(--space-x))] pb-[81px] pt-[33px] md:px-x md:pb-[96px] md:pt-[38px] bg-yellow h-full overflow-auto">
        <Form
          formType="preference"
          audienceId={'bb463f94-85c4-4e57-9fc8-20fa3757be04'}
          successMessage={waitlist?.successMessage}
          formSubmitted={formActions.formSubmitted}
          handleSubmit={formActions.handleSubmit}
          setFormSubmitted={formActions.setFormSubmitted}
          className="w-full"
          isHomeBlock={true}
        >
          <PreferencePaneInputs
            block={true}
            broker={broker}
            formPanes={formPanes}
            setFullWidth={setFullWidth}
            header={waitlist?.header}
            copy={waitlist?.text}
            buttonCopy="Join waitlist"
            register={formActions.register}
            className={classNames(fullWidth ? '' : 'max-w-[430px]', 'h-full')}
            trigger={formActions.trigger}
            formValues={formActions.getValues}
          />
        </Form>
      </div>
    </div>
  )
}

export default PreferenceForm
