import type { FC } from 'react'
import classNames from 'classnames'
import type { WaitlistBlock as WaitlistBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'

type WaitlistBlockProps = Omit<SanityBlockElement, keyof WaitlistBlockType> &
  WaitlistBlockType

export const WaitlistBlock: FC<WaitlistBlockProps> = ({
  header,
  text,
  audienceId,
  formType,
  className,
}) => {
  return (
    <Block className={classNames(className, 'relative')}>
      <div className="relative w-[100vw] -left-x bg-whitesmoke z-behind"></div>
      <div className="py-ylg rich-text">
        {header && <h2>{header}</h2>}
        {text && (
          <RichText blocks={text} className={classNames('clear-both')} />
        )}
      </div>
    </Block>
  )
}

export default WaitlistBlock
