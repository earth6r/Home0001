import type { FC } from 'react'
import classNames from 'classnames'
import type { TextBlock as TextBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'

type TextBlockProps = Omit<SanityBlockElement, keyof TextBlockType> &
  TextBlockType

export const TextBlock: FC<TextBlockProps> = ({ text, className }) => {
  return (
    <Block className={className}>
      <div className="container">
        {text && (
          <RichText blocks={text} className={classNames('clear-both')} />
        )}
      </div>
    </Block>
  )
}

export default TextBlock
