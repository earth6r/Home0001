import type { FC } from 'react'
import { useState } from 'react'
import classNames from 'classnames'
import type { NewsletterBlock as NewsletterBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'
import { Form, SinglePaneInputs } from '@components/form'
import { useForm } from 'react-hook-form'

type NewsletterBlockProps = Omit<
  SanityBlockElement,
  keyof NewsletterBlockType
> &
  NewsletterBlockType

export const NewsletterBlock: FC<NewsletterBlockProps> = ({
  header,
  text,
  grid,
  audienceId,
  className,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
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
        {header && <h2 className="pb-ydouble uppercase">{header}</h2>}

        {text && (
          <RichText blocks={text} className={classNames('mb-4 clear-both')} />
        )}

        <Form
          formType={'newsletter'}
          audienceId={audienceId}
          handleSubmit={handleSubmit}
          formSubmitted={formSubmitted}
          setFormSubmitted={setFormSubmitted}
          successMessage={'Your data — our harvest.'}
        >
          <SinglePaneInputs
            isSubmitting={isSubmitting}
            register={register}
            fields={{ showName: true }}
          />
        </Form>
      </div>
    </Block>
  )
}

export default NewsletterBlock
