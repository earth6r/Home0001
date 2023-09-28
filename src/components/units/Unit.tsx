import { type FC, HTMLAttributes, useContext } from 'react'
import { HomeContext } from '@contexts/home'
import { ImageCarousel } from '@components/carousel'

export const Unit: FC<HTMLAttributes<HTMLElement>> = ({ className }) => {
  const { state } = useContext(HomeContext)
  const unit = state.unit

  return (
    unit && (
      <div className={className}>
        <div className="flex flex-col relative mt-10">
          {unit.photographs && unit.photographs.length > 0 && (
            <ImageCarousel slides={unit.photographs} className="w-full" />
          )}
          {/* <div className="mt-10">
            <div>
              {selectedPropertyType.propertyType && (
                <p className="m-0 uppercase tracking-caps">
                  {
                    (selectedPropertyType.property.title =
                      '1322 DOUGLAS ST.' &&
                      selectedPropertyType.propertyType == 'two-bedrooms' ? (
                        <span>TOWNHOUSE&nbsp;&mdash;&nbsp;#6</span>
                      ) : (
                        (selectedPropertyType.property.title =
                          '1322 DOUGLAS ST.' &&
                          selectedPropertyType.propertyType == 'penthouse' ? (
                            <span>TOWNHOUSE&nbsp;&mdash;&nbsp;#7</span>
                          ) : (
                            selectedPropertyType.propertyType
                              .replace('one-bedroom', '1 bedroom')
                              .replace('studio-max', 'studio max')
                          ))
                      ))
                  }

                  {selectedPropertyType.propertyType != 'two-bedrooms' &&
                  selectedPropertyType.propertyType != 'penthouse' ? (
                    <span>&nbsp;—&nbsp;</span>
                  ) : null}
                  {selectedPropertyType._rawInventory
                    ? selectedPropertyType.propertyType === 'studio'
                      ? 'UNIT 3B'
                      : selectedPropertyType.propertyType === 'studio-max'
                      ? 'UNIT 4A'
                      : selectedPropertyType.propertyType === 'one-bedroom'
                      ? 'UNIT 6B'
                      : null
                    : null}
                </p>
              )}
            </div>
          </div>
          <div className="text-mobile-body md:text-desktop-body pr-mobile-menu md:pr-0">
            <div className="">
              {selectedPropertyType.price == 'Inquire'
                ? 'Price upon request'
                : selectedPropertyType.price && (
                    <p className="m-0">{selectedPropertyType.price}</p>
                  )}
              {selectedPropertyType.area && (
                <p className="mb-4 m-0">{selectedPropertyType.area}</p>
              )}
              {selectedPropertyType.propertyType === 'studio'
                ? returnStudioData()
                : selectedPropertyType.propertyType === 'studio-max'
                ? returnStudioMaxData()
                : selectedPropertyType.propertyType === 'one-bedroom'
                ? returnOneBedroomData()
                : selectedPropertyType.propertyType == 'two-bedrooms' ||
                  selectedPropertyType.propertyType == 'penthouse'
                ? returnLAData()
                : null}
            </div>
          </div> */}
          {/* {selectedPropertyType.propertyType && (
            <h3 className="uppercase tracking-caps my-10 pr-mobile-menu md:pr-0">
            {selectedPropertyType.propertyType
              .replace("one-bedroom", "1 bedroom")
              .replace("two-bedroom", "3 story townhouse")
              .replace("studio-max", "studio max")}
              </h3>
            )} */}
          {/* {selectedPropertyType?._rawDescription?.text && (
            <div className="mt-5 pr-mobile-menu md:pr-0 text-mobile-body md:text-desktop-body property-type-description">
              <StandardText data={selectedPropertyType?._rawDescription} />
            </div>
          )} */}
        </div>

        {/* <div className=" hidden">
          <InventoryModule
            title={property.title}
            propertyType={selectedPropertyType.propertyType}
            data={selectedPropertyType}
            viewInventoryText={'View sample inventory'}
          />
        </div>
        <div className="">
          <ExtendedInfoModule
            data={{
              type: selectedPropertyType.propertyType,
              sqft: selectedPropertyType.area,
            }}
          />
        </div>
        {selectedPropertyType.moreImages?.length ? (
          <div className="w-full mt-10">
            {selectedPropertyType.propertyType === 'two-bedrooms' ||
            selectedPropertyType.propertyType === 'penthouse' ? (
              <div className="w-full relative">
                {selectedPropertyType?.images &&
                  selectedPropertyType.images.length !== 0 && (
                    <ImageSlider images={selectedPropertyType.moreImages} />
                  )}
              </div>
            ) : (
              selectedPropertyType?.images &&
              selectedPropertyType.images.length !== 0 && (
                <ImageSlider images={selectedPropertyType.moreImages} />
              )
            )}
          </div>
        ) : null}
        {selectedPropertyType?._rawDescriptionTwo?.text && (
          <div className="mt-10 pr-mobile-menu md:pr-0 text-mobile-body md:text-desktop-body property-type-description">
            <StandardText data={selectedPropertyType?._rawDescriptionTwo} />
          </div>
        )}

        <HowItWorksModal data={howItWorks} /> */}
      </div>
    )
  )
}

export default Unit
