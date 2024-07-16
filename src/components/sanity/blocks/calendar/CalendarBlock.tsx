import type { FC } from 'react'
import classNames from 'classnames'
import type { CalendarBlock as CalendarBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'

type CalendarBlockProps = Omit<SanityBlockElement, keyof CalendarBlockType> &
  CalendarBlockType

export const CalendarBlock: FC<CalendarBlockProps> = ({
  header,
  embedCode,
  className,
}) => {
  return (
    <Block className={classNames(className, '')}>
      {header && (
        <RichText blocks={header} className="mb-y text-left md:text-center" />
      )}

      <div
        className="meetings-iframe-container"
        data-src={`https://meetings.hubspot.com/${embedCode}?embed=true`}
      ></div>
    </Block>
  )
}

export default CalendarBlock
