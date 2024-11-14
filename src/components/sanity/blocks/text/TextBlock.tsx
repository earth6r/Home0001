import { useEffect, useState, type FC } from 'react'
import classNames from 'classnames'
import type { TextBlock as TextBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'
import { Accordion } from '@components/accordion'
import { useRouter } from 'next/router'

type TextBlockProps = Omit<SanityBlockElement, keyof TextBlockType> &
  TextBlockType

export const TextBlock: FC<TextBlockProps> = ({
  anchor,
  text,
  accordion,
  columns = 3,
  bottomBorder,
  topBorder,
  yellowBackground,
  stickyHeader,
  header,
  grid,
  className,
}) => {
  const { asPath } = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  console.log('textBlock accordion: ', accordion)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <Block
      id={anchor}
      style={{
        gridTemplateColumns: columns
          ? `repeat(${columns}, minmax(0, 1fr))`
          : 'repeat(3, minmax(0, 1fr))',
        paddingRight: columns === 2 && isMobile ? 'var(--space-menu)' : '',
      }}
      className={classNames(
        className,
        yellowBackground
          ? 'bg-yellow w-[calc(100%+(var(--space-x)*2))] -left-x px-x py-ydouble'
          : '',
        !yellowBackground && grid ? `md:grid` : '',
        bottomBorder ? 'pb-ydouble border-bottom' : '',
        topBorder ? 'pt-ydouble border-top mt-40' : ''
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
        {accordion && (
          <Accordion
            {...accordion}
            readMore={true}
            open={asPath.includes(`#${anchor}`)}
          />
        )}
      </div>
    </Block>
  )
}

export default TextBlock
