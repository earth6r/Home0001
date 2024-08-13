import type { FC } from 'react'
import classNames from 'classnames'
import type { TextBlock as TextBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'
import { Accordion } from '@components/accordion'

type TextBlockProps = Omit<SanityBlockElement, keyof TextBlockType> &
  TextBlockType

export const TextBlock: FC<TextBlockProps> = ({
  anchor,
  text,
  accordion,
  columns = 3,
  bottomBorder,
  yellowBackground,
  stickyHeader,
  header,
  grid,
  className,
}) => {
  return (
    <Block
      id={anchor}
      style={{
        gridTemplateColumns: columns
          ? `repeat(${columns}, minmax(0, 1fr))`
          : 'repeat(3, minmax(0, 1fr))',
      }}
      className={classNames(
        className,
        yellowBackground
          ? 'bg-yellow w-[calc(100%+(var(--space-x)*2))] -left-x px-x py-ydouble'
          : '',
        !yellowBackground && grid ? `md:grid` : '',
        bottomBorder ? 'pb-y -mb-y border-bottom' : ''
      )}
    >
      {stickyHeader && header && (
        <RichText
          blocks={header}
          className={classNames(
            'md:block md:sticky h-[max-content] md:top-[var(--header-height)] col-start-1 clear-both md:pr-x mb-ydouble'
          )}
        />
      )}
      <div
        style={{
          gridColumnStart: (columns && columns > 2) || stickyHeader ? 2 : 1,
        }}
      >
        {text && (
          <RichText blocks={text} className={classNames('clear-both')} />
        )}
        {accordion && <Accordion {...accordion} readMore={true} />}
      </div>
    </Block>
  )
}

export default TextBlock
