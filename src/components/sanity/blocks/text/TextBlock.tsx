import { useEffect, useRef, useState, type FC } from 'react'
import classNames from 'classnames'
import type { TextBlock as TextBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement, SanityMediaProps } from '@components/sanity'
import { Block, RichText, SanityMedia } from '@components/sanity'
import { Accordion } from '@components/accordion'
import { useRouter } from 'next/router'
import { Disclosure, Transition } from '@headlessui/react'

type TextBlockProps = Omit<SanityBlockElement, keyof TextBlockType> &
  TextBlockType

export const TextBlock: FC<TextBlockProps> = ({
  anchor,
  columns = 3,
  text,
  accordion,
  yellowBackground,
  stickyHeader,
  header,
  stickyMedia,
  grid,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const [domain, setDomain] = useState<string | undefined>(undefined)
  const [isOpen, setIsOpen] = useState(
    router.asPath.includes(`#${anchor}`) || accordion?.openOnDesktop
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    setDomain(window.location.host)
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
        columns === 2 && header ? '' : 'pr-menu md:pr-0'
      )}
    >
      {stickyHeader && header && (
        <div
          className={classNames(
            domain?.includes('0001.studio') ||
              router.asPath === '/rd' ||
              router.asPath === '/about'
              ? 'pr-menusm md:pr-0'
              : '',
            'md:block md:sticky h-[max-content] md:top-y col-start-1 clear-both md:pr-x mb-ydouble'
          )}
        >
          <RichText blocks={header} />

          {stickyMedia && (
            <Disclosure defaultOpen={isOpen}>
              <Transition
                show={isOpen}
                ref={ref}
                className={classNames(
                  isOpen
                    ? 'overflow-visible md:overflow-hidden'
                    : 'overflow-hidden',
                  'will-change-[maxHeight]'
                )}
                enter="maxHeight duration-200 ease-in-out"
                enterFrom="max-h-0"
              >
                <Disclosure.Panel>
                  <SanityMedia
                    {...(stickyMedia as SanityMediaProps)}
                    imageProps={{
                      alt: stickyMedia.alt || 'Media',
                    }}
                    className="hidden md:block w-full h-auto object-contain select-none"
                  />
                </Disclosure.Panel>
              </Transition>
            </Disclosure>
          )}
        </div>
      )}
      <div
        style={{
          gridColumnStart: (columns && columns > 2) || stickyHeader ? 2 : 1,
          paddingRight:
            columns === 2 && header
              ? router.asPath === '/about' ||
                router.asPath === '/rd' ||
                domain?.includes('0001.studio')
                ? 'calc(var(--space-menu-sm)'
                : 'var(--space-menu)'
              : '',
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
            open={router.asPath.includes(`#${anchor}`)}
            openOnDesktop={accordion.openOnDesktop}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    </Block>
  )
}

export default TextBlock
