import { type FC } from 'react'
import classNames from 'classnames'
import { KeyedPropertyTypeProps, PropertyTypeListProps } from './types'
import PropertyTypeSummary from './PropertyTypeSummary'

export const PropertyTypesList: FC<PropertyTypeListProps> = ({
  propertyTypesList,
  showCity = false,
  className,
}) => {
  return (
    <ul
      className={classNames(
        className,
        'relative w-full max-w-full pb-y border-bottom lg:border-none'
      )}
    >
      {propertyTypesList &&
        propertyTypesList.map((propertyType: KeyedPropertyTypeProps) => {
          return (
            <div
              key={propertyType._id}
              className="w-full py-y border-bottom border-top lg:border-t-0 first-of-type:border-t-0"
            >
              <PropertyTypeSummary
                propertyType={propertyType}
                showCity={showCity}
                className="w-full"
              />
            </div>
          )
        })}
    </ul>
  )
}

export default PropertyTypesList
