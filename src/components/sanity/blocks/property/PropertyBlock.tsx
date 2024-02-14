import { type FC } from 'react'
import classNames from 'classnames'
import type { PropertyBlock as PropertyBlockType } from '@gen/sanity-schema'
import { Block, SanityBlockElement } from '@components/sanity'
import { Property, PropertyContentProps } from '@components/property'

type PropertyBlockProps = Omit<SanityBlockElement, keyof PropertyBlockType> &
  PropertyBlockType

export const PropertyBlock: FC<PropertyBlockProps> = ({
  propertyRef,
  className,
}) => {
  return (
    <Block className={classNames(className, 'mt-header')}>
      <Property property={propertyRef as PropertyContentProps} block={true} />
    </Block>
  )
}

export default PropertyBlock
