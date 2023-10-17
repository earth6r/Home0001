import type { FC } from 'react'
import { useState } from 'react'
import classNames from 'classnames'
import type { WaitlistBlock as WaitlistBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'
import { HubspotForm } from '@components/form'

type WaitlistBlockProps = Omit<SanityBlockElement, keyof WaitlistBlockType> &
  WaitlistBlockType

export const WaitlistBlock: FC<WaitlistBlockProps> = ({
  header,
  text,
  audienceId,
  formType,
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
      <div className="absolute md:relative w-[100vw] h-full -left-x bg-whitesmoke z-behind"></div>
      <div className="py-12">
        {header && <h2 className="pb-ylg uppercase">{header}</h2>}

        {text ? (
          formSubmitted ? (
            <RichText blocks={text} className={classNames('mb-4 clear-both')} />
          ) : null
        ) : null}

        <HubspotForm
          formType={formType}
          audienceId={audienceId}
          formSubmitted={formSubmitted}
          setFormSubmitted={setFormSubmitted}
        />
      </div>
    </Block>
  )
}

export default WaitlistBlock
