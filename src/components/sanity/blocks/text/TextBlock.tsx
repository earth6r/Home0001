import { useEffect, useState, type FC } from 'react'
import classNames from 'classnames'
import type { TextBlock as TextBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement, SanityMediaProps } from '@components/sanity'
import { Block, RichText, SanityMedia } from '@components/sanity'
import { Accordion } from '@components/accordion'
import { useRouter } from 'next/router'

type TextBlockProps = Omit<SanityBlockElement, keyof TextBlockType> &
  TextBlockType

export const TextBlock: FC<TextBlockProps> = ({
  anchor,
  columns = 3,
  text,
  accordion,
  bottomBorder,
  yellowBackground,
  stickyHeader,
  header,
  stickyMedia,
  grid,
  className,
}) => {
  const { asPath } = useRouter()
  const [isMobile, setIsMobile] = useState(false)

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
        gap: columns === 2 ? `var(--space-x)` : '',
      }}
      className={classNames(
        className,
        yellowBackground
          ? 'bg-yellow w-[calc(100%+(var(--space-x)*2))] -left-x px-x py-ydouble'
          : '',
        !yellowBackground && grid ? `md:grid` : '',
        bottomBorder ? 'pb-ydouble border-bottom' : '',
        columns === 2 && header ? '' : 'pr-menu md:pr-0'
      )}
    >
      {stickyHeader && header && (
        <div
          className={classNames(
            'md:block md:sticky h-[max-content] md:top-y col-start-1 clear-both md:pr-x mb-ydouble'
          )}
        >
          <RichText blocks={header} />

          {stickyMedia && (
            <SanityMedia
              {...(stickyMedia as SanityMediaProps)}
              imageProps={{
                alt: stickyMedia.alt || 'Media',
              }}
              className="hidden md:block w-full h-auto object-contain select-none"
            />
          )}
        </div>
      )}
      <div
        style={{
          gridColumnStart: (columns && columns > 2) || stickyHeader ? 2 : 1,
          paddingRight: columns === 2 && header ? 'var(--space-menu)' : '',
        }}
      >
        {text && (
          <RichText blocks={text} className={classNames('clear-both')} />
        )}

        {accordion && (
          <Accordion
            {...accordion}
            media={stickyMedia as SanityMediaProps}
            readMore={true}
            open={asPath.includes(`#${anchor}`)}
            openOnDesktop={accordion.openOnDesktop}
          />
        )}
      </div>
    </Block>
  )
}

export default TextBlock
