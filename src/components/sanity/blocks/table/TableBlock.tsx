import type { FC } from 'react'
import classNames from 'classnames'
import type { TableBlock as TableBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText } from '@components/sanity'

type TableBlockProps = Omit<SanityBlockElement, keyof TableBlockType> &
  TableBlockType

export const TableBlock: FC<TableBlockProps> = ({ table, grid, className }) => {
  return (
    <Block className={classNames(className, 'lg:w-1/2 m-0 table-border-black')}>
      {table &&
        table.length > 0 &&
        table.map(({ _key, cells }) => (
          <div
            key={_key}
            className="flex items-start gap-x p-x border-bottom--gray last-of-type:border-b-0"
          >
            {cells && cells.header && (
              <p className="inline-block w-[140px] text-md font-medium text-left">
                {cells.header}
              </p>
            )}
            {cells && cells.content && (
              <RichText
                className="w-[calc(100%-140px)]"
                blocks={cells.content}
              />
            )}
          </div>
        ))}
    </Block>
  )
}

export default TableBlock
