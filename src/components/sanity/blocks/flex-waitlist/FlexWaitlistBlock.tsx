import type { FC } from 'react'
import { useState } from 'react'
import classNames from 'classnames'
import type { FlexWaitlistBlock as FlexWaitlistBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block } from '@components/sanity'
import { useForm } from 'react-hook-form'
import { PreferenceForm } from '@components/preferenceForm'

type FlexWaitlistBlockProps = Omit<
  SanityBlockElement,
  keyof FlexWaitlistBlockType
> &
  FlexWaitlistBlockType

export const FlexWaitlistBlock: FC<FlexWaitlistBlockProps> = ({
  header,
  text,
  grid,
  audienceId,
  successMessage,
  formPanes,
  className,
}) => {
  const { register, handleSubmit, reset, trigger, getValues } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [fullWidth, setFullWidth] = useState(false)

  return (
    <Block
      className={classNames(
        className,
        grid ? 'md:grid md:grid-cols-3 pr-menu' : '',
        'relative mt-block'
      )}
    >
      <div className="w-full">
        <PreferenceForm
          waitlist={{
            header: header,
            text: text,
            id: audienceId,
            successMessage: successMessage,
          }}
          formActions={{
            formSubmitted,
            setFormSubmitted,
            handleSubmit,
            trigger,
            register,
            getValues,
          }}
          formPanes={formPanes}
          broker={false}
          setFullWidth={() => setFullWidth(!fullWidth)}
          fullWidth={fullWidth}
          className={classNames(
            fullWidth ? 'md:left-0 md:w-full' : 'md:left-[20%] md:w-4/5',
            'relative transition-all duration-200 ease-in-out'
          )}
        />
      </div>
    </Block>
  )
}

export default FlexWaitlistBlock
