import type { FC } from 'react'
import classNames from 'classnames'
import type { TextBlock as TextBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'

type TextBlockProps = Omit<SanityBlockElement, keyof TextBlockType> &
  TextBlockType

export const TextBlock: FC<TextBlockProps> = ({
  text,
  yellowBackground,
  grid,
  className,
}) => {
  return (
    <Block
      className={classNames(
        className,
        yellowBackground
          ? 'bg-yellow w-[calc(100%+(var(--space-x)*2))] -left-x px-x py-ydouble'
          : '',
        !yellowBackground && grid ? 'md:grid md:grid-cols-3 pr-menu' : ''
      )}
    >
      <div className="md:col-start-2 md:col-span-1">
        {text && (
          <RichText blocks={text} className={classNames('clear-both pr-x')} />
        )}
      </div>
    </Block>
  )
}

export default TextBlock
