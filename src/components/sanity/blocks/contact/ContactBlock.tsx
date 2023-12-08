import type { FC } from 'react'
import { useState } from 'react'
import classNames from 'classnames'
import type { ContactBlock as ContactBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'
import { Form, SinglePaneInputs } from '@components/form'
import { useForm } from 'react-hook-form'

type ContactBlockProps = Omit<SanityBlockElement, keyof ContactBlockType> &
  ContactBlockType

export const ContactBlock: FC<ContactBlockProps> = ({
  header,
  text,
  grid,
  audienceId,
  className,
}) => {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <Block
      className={classNames(
        className,
        grid ? 'md:grid md:grid-cols-3 pr-menu' : '',
        'relative'
      )}
    >
      <div className="md:col-start-2 md:col-span-1 pb-12">
        {header && <h2 className="pb-ylg uppercase">{header}</h2>}

        {text && (
          <RichText blocks={text} className={classNames('mb-4 clear-both')} />
        )}

        <Form
          formType={'contact'}
          audienceId={audienceId}
          formSubmitted={formSubmitted}
          handleSubmit={handleSubmit}
          setFormSubmitted={setFormSubmitted}
          successMessage="Thanks for reaching out. We’ll be in touch soon."
        >
          <SinglePaneInputs
            register={register}
            fields={{ showContact: true, showName: true }}
          />
        </Form>
      </div>
    </Block>
  )
}

export default ContactBlock
