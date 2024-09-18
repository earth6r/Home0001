import { type FC } from 'react'
import classNames from 'classnames'
import { Block, SanityBlockElement } from '@components/sanity'
import type { PropertyTypesBlock as PropertyTypesBlockType } from '@gen/sanity-schema'
import {
  KeyedPropertyTypeProps,
  PropertyTypesList,
} from '@components/property-type'

type PropertyTypesBlockProps = Omit<
  SanityBlockElement,
  keyof PropertyTypesBlockType
> &
  PropertyTypesBlockType

export const PropertyTypesBlock: FC<PropertyTypesBlockProps> = ({
  header,
  propertyTypes,
  className,
}) => {
  return (
    <Block className={classNames(className, 'mt-0')}>
      <div className="mx-auto px-x md:px-[calc(var(--space-menu)+12px)] xl:px-0 overflow-hidden">
        <h2 className="text-h2 text-center">{header || `Now available in:`}</h2>

        {propertyTypes && (
          <PropertyTypesList
            className="animate-in flex flex-col mt-ydouble mx-x"
            propertyTypesList={propertyTypes as KeyedPropertyTypeProps[]}
            showCity={true}
          />
        )}
      </div>
    </Block>
  )
}

export default PropertyTypesBlock
