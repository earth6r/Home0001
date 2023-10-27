import type { FC } from 'react'
import { useState } from 'react'
import classNames from 'classnames'
import type { ContactBlock as ContactBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'
import { HubspotForm } from '@components/form'

type ContactBlockProps = Omit<SanityBlockElement, keyof ContactBlockType> &
  ContactBlockType

export const ContactBlock: FC<ContactBlockProps> = ({
  header,
  text,
  audienceId,
  className,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <Block
      className={classNames(
        className,
        'md:grid md:grid-cols-3 relative pr-menu'
      )}
    >
      <div className="md:col-start-2 md:col-span-1 pb-12">
        {header && <h2 className="pb-ylg uppercase">{header}</h2>}

        {text && (
          <RichText blocks={text} className={classNames('mb-4 clear-both')} />
        )}

        <HubspotForm
          formType={'newsletter'}
          audienceId={audienceId}
          formSubmitted={formSubmitted}
          setFormSubmitted={setFormSubmitted}
        />
      </div>
    </Block>
  )
}

export default ContactBlock
