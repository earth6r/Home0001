import type { FC } from 'react'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import type { WaitlistBlock as WaitlistBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'
import { Form, SinglePaneInputs } from '@components/form'
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
  const { register, handleSubmit, reset, trigger } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [fullWidth, setFullWidth] = useState(false)

  useEffect(() => {
    console.log(trigger)
  }, [trigger])

  return (
    <Block
      className={classNames(
        className,
        grid ? 'md:grid md:grid-cols-3 pr-menu' : '',
        'relative'
      )}
    >
      <div className="md:grid md:grid-cols-3 mt-16">
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
          }}
          setFullWidth={() => setFullWidth(true)}
          className={classNames(
            fullWidth
              ? 'md:col-start-1 md:col-span-3'
              : 'md:col-start-2 md:col-span-2',
            ''
          )}
        />
      </div>
    </Block>
  )
}

export default WaitlistBlock
