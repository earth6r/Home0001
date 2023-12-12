import { type FC, HTMLAttributes, Dispatch, SetStateAction } from 'react'
import classNames from 'classnames'
import { RichText } from '@studio/gen/sanity-schema'
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form'
import { Form, MultiPaneInputs } from '@components/form'

interface WaitlistProps extends HTMLAttributes<HTMLDivElement> {
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
  }
  setFullWidth?: () => void
  fullWidth?: boolean
}

export const Waitlist: FC<WaitlistProps> = ({
  waitlist,
  formActions,
  fullWidth,
  setFullWidth,
  className,
}) => {
  return (
    <div className={classNames(className)}>
      <div className="h-[690px] md:h-[740px] pl-x pr-[calc(var(--space-menu)+var(--space-x))] pb-[41px] pt-[33px] md:px-x md:pb-[56px] md:pt-[38px] bg-yellow">
        <Form
          formType="modal"
          audienceId={waitlist?.id}
          successMessage={waitlist?.successMessage}
          formSubmitted={formActions.formSubmitted}
          handleSubmit={formActions.handleSubmit}
          setFormSubmitted={formActions.setFormSubmitted}
          className="w-full h-full"
        >
          <MultiPaneInputs
            block={true}
            setFullWidth={setFullWidth}
            header={waitlist?.header}
            copy={waitlist?.text}
            buttonCopy="Join waitlist"
            register={formActions.register}
            className={classNames(fullWidth ? '' : 'max-w-[430px]', 'h-full')}
            trigger={formActions.trigger}
          />
        </Form>
      </div>
    </div>
  )
}

export default Waitlist
