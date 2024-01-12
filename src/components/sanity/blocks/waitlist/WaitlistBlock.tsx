import type { FC } from 'react'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import type { WaitlistBlock as WaitlistBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block } from '@components/sanity'
import { useForm } from 'react-hook-form'
import { Waitlist } from '@components/waitlist'

type WaitlistBlockProps = Omit<SanityBlockElement, keyof WaitlistBlockType> &
  WaitlistBlockType

export const WaitlistBlock: FC<WaitlistBlockProps> = ({
  header,
  text,
  grid,
  audienceId,
  successMessage,
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
        <Waitlist
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
          setFullWidth={() => setFullWidth(true)}
          fullWidth={fullWidth}
          className={classNames(
            fullWidth ? 'md:left-0 md:w-full' : 'md:left-1/3 md:w-2/3',
            'relative transition-all duration-200 ease-in-out'
          )}
        />
      </div>
    </Block>
  )
}

export default WaitlistBlock
