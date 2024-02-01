import type { FC } from 'react'
import classNames from 'classnames'
import type { CalendarBlock as CalendarBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'

type CalendarBlockProps = Omit<SanityBlockElement, keyof CalendarBlockType> &
  CalendarBlockType

export const CalendarBlock: FC<CalendarBlockProps> = ({
  header,
  laEmbedCode,
  nyEmbedCode,
  phoneEmbedCode,
  className,
}) => {
  return (
    <Block className={classNames(className, '')}>
      {header && <RichText blocks={header} className="mb-y text-center" />}

      <div
        className="meetings-iframe-container"
        data-src={`https://meetings.hubspot.com/${laEmbedCode}?embed=true`}
      ></div>

      <div
        className="meetings-iframe-container"
        data-src={`https://meetings.hubspot.com/${nyEmbedCode}?embed=true`}
      ></div>

      <div
        className="meetings-iframe-container"
        data-src={`https://meetings.hubspot.com/${phoneEmbedCode}?embed=true`}
      ></div>
    </Block>
  )
}

export default CalendarBlock
