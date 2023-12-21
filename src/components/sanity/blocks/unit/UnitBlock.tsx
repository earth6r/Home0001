import { type FC } from 'react'
import classNames from 'classnames'
import type { UnitBlock as UnitBlockType } from '@gen/sanity-schema'
import { Block, SanityBlockElement } from '@components/sanity'
import { Unit, UnitContentProps } from '@components/unit'

type UnitBlockProps = Omit<SanityBlockElement, keyof UnitBlockType> &
  UnitBlockType

export const UnitBlock: FC<UnitBlockProps> = ({ unitRef, className }) => {
  console.log('unitRef: ', unitRef)

  return (
    <Block className={classNames(className, '')}>
      <Unit unit={unitRef as UnitContentProps} />
    </Block>
  )
}

export default UnitBlock
