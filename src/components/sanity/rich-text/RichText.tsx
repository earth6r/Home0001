import type { FC } from 'react'
import classNames from 'classnames'
import { PortableText } from '@portabletext/react'
import type { SanityBlockElement } from '@components/sanity'
import { blockTypes, blockMarks, blockBlock } from '@components/sanity'

export const RichText: FC<SanityBlockElement> = ({
  blocks,
  className,
  style,
}) =>
  blocks ? (
    <div className={classNames('rich-text', className)} style={style}>
      <PortableText
        value={blocks}
        components={{
          types: blockTypes,
          marks: blockMarks,
          block: blockBlock,
        }}
      />
    </div>
  ) : null

export default RichText
