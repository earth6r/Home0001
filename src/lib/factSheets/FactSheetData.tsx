import React, { FC, HTMLAttributes } from 'react'
import styles from './factSheetData.module.css'
import classNames from 'classnames'

const COMMON_PRICE_CHART = {
  'one-bedroom': '$1,560.28',
  studio: '$744.01',
  'studio-max': '$761.64',
}

const PROPERTY_TAX_CHART = {
  'one-bedroom': '$1,183.53',
  studio: '$564.35',
  'studio-max': '$577.72',
}

interface CityDataProps extends HTMLAttributes<HTMLDivElement> {
  type?: string
  area?: string
}

export const LAData = () => {
  return (
    <div className="pb-10" id="buyers-guide">
      <div className="mt-10 mb-4 uppercase px-4 md:px-0">
        Taxes and Fees (Estimated)
      </div>
      <div className={classNames(styles['buyers-guide'], 'px-4 md:px-0')}>
        <ul>
          <li>Property Tax (monthly):</li>
        </ul>
        <ul>
          <li>$1,614.58</li>
        </ul>
      </div>
      <div className="mt-10 mb-4 uppercase px-4 md:px-0">
        Unit specifications
      </div>
      <div className={classNames(styles['buyers-guide'], 'px-4 md:px-0')}>
        <ul>
          <li>Bedrooms:</li>
          <li>Bath:</li>
          <li>Sq Ft:</li>
          <li>Built:</li>
          <li>Heating:</li>
          <li>Cooling:</li>
          <li>Pets:</li>
          <li>Solar:</li>
          <li>Parking:</li>
          <li>Amenities:</li>
          <li>Appliances:</li>
        </ul>
        <ul>
          <li>3</li>
          <li>3.5</li>
          <li>1,983</li>
          <li>2023</li>
          <li>Central</li>
          <li>Central</li>
          <li>Allowed</li>
          <li>Rooftop solar</li>
          <li>Two-car garage</li>
          <li>Full private roof deck</li>
          <li>Stainless steel Bosch</li>
        </ul>
      </div>
      <div className="mt-10 mb-4 uppercase tracking-caps px-4 md:px-0">
        Districts and Zoning
      </div>
      <div className={classNames(styles['buyers-guide'], 'px-4 md:px-0')}>
        <ul>
          <li>Community District:</li>
          <li>Neighborhood Council:</li>
          <li>Community Planning Area:</li>
          <li>Police Precinct:</li>
          <li>Zone:</li>
          <li>Parcel:</li>
        </ul>
        <ul>
          <li>103</li>
          <li>44 - Echo Park</li>
          <li>Silverlake - Echo Park</li>
          <li>Northeast</li>
          <li>RD1.5-1VL</li>
          <li>5406011019</li>
        </ul>
      </div>

      <div className="mt-10 mb-4 uppercase tracking-caps px-4 md:px-0">
        School District
      </div>
      <div className={classNames(styles['buyers-guide'], 'px-4 md:px-0')}>
        <ul>
          <li>School District:</li>
          <li>Elementary:</li>
          <li>High School:</li>
        </ul>
        <ul>
          <li>Los Angeles Unified School District</li>
          <li>Logan Academy</li>
          <li>Belmont Senior High</li>
        </ul>
      </div>
      <div className="mt-10 mb-4 uppercase tracking-caps px-4 md:px-0">
        Parks
      </div>
      <div className={classNames(styles['buyers-guide'], 'px-4 md:px-0')}>
        <ul>
          <li>Elysian Park:</li>
          <li>Echo Park:</li>
          <li>Dodger Stadium:</li>
        </ul>
        <ul>
          <li>0.1 miles</li>
          <li>0.6 miles</li>
          <li>0.4 miles</li>
        </ul>
      </div>
    </div>
  )
}

export const AllenData: FC<CityDataProps> = ({ type, area }) => {
  const getCommonPrice = (type: string) => {
    switch (type) {
      case 'studio':
        return COMMON_PRICE_CHART['studio']
      case 'studio-max':
        return COMMON_PRICE_CHART['studio-max']
      case 'one-bedroom':
        return COMMON_PRICE_CHART['one-bedroom']
    }
    return null
  }

  const getPropertyTax = (type: string) => {
    switch (type) {
      case 'studio':
        return PROPERTY_TAX_CHART['studio']
      case 'studio-max':
        return PROPERTY_TAX_CHART['studio-max']
      case 'one-bedroom':
        return PROPERTY_TAX_CHART['one-bedroom']
    }
    return null
  }

  const commonPrice = type && getCommonPrice(type)
  const propertyTax = type && getPropertyTax(type)
  return (
    <div className="pb-10">
      <div className=" mt-10 mb-4 uppercase tracking-caps px-4 md:px-0">
        Taxes and Fees (Estimated)
      </div>
      <div className={classNames(styles['buyers-guide'], 'px-4 md:px-0')}>
        <ul>
          <li>Common Charges:</li>
          <li>Property Tax:</li>
        </ul>
        {type && (
          <ul>
            <li>{commonPrice}</li>
            <li>{propertyTax}</li>
          </ul>
        )}
      </div>

      <div className="mt-10 mb-4 uppercase tracking-caps px-4 md:px-0">
        Unit specifications
      </div>
      <div className={classNames(styles['buyers-guide'], 'px-4 md:px-0')}>
        <ul>
          <li>Bedrooms:</li>
          <li>Bath:</li>
          <li>Sq Ft:</li>
          <li>Heating:</li>
          <li>Cooling:</li>
          <li>Stove:</li>
          <li>Oven:</li>
          <li>Refrigerator:</li>
          <li>Cabinets:</li>
          <li>Fixtures:</li>
          {type == 'one-bedroom' ? <li>Laundry:</li> : <li>Outdoor space:</li>}
        </ul>
        <ul>
          <li>{type == 'one-bedroom' ? type : 'studio'}</li>
          <li>1</li>
          <li>{area}</li>
          <li>Central</li>
          <li>Central</li>
          <li>Summit electric</li>
          <li>Stainless steel Bosch</li>
          <li>Blomberg</li>
          <li>Alta Cucina kitchen</li>
          <li>Porcelanosa</li>
          {type == 'one-bedroom' ? (
            <li>En-suite Bosch washer/dryer</li>
          ) : (
            <li>
              En-suite full-door entry onto fire escape balcony overlooking
              Allen Street
            </li>
          )}
        </ul>
      </div>
      <div className="mt-10 mb-4 uppercase tracking-caps px-4 md:px-0">
        Building specifications
      </div>
      <div className={classNames(styles['buyers-guide'], 'px-4 md:px-0')}>
        <ul>
          <li>Type:</li>
          <li>Built:</li>
          <li>Renovated:</li>
          <li>Elevator building:</li>
          <li>Floors:</li>
          <li>Heating:</li>
          <li>Cooling:</li>
          <li>ADA:</li>
          <li>Pets:</li>
          <li>Storage:</li>
          <li>Amenities:</li>
          <li>Parking:</li>
        </ul>
        <ul>
          <li>Condominium</li>
          <li>1900</li>
          <li>2021-’23</li>
          <li>Yes</li>
          <li>7 story</li>
          <li>Central</li>
          <li>Central</li>
          <li>Wheelchair Access</li>
          <li>Allowed</li>
          <li>Bike storage and package room</li>
          <li>Rooftop deck, laundry</li>
          <li>Monthly parking lot across street</li>
        </ul>
      </div>

      <div className="mt-10 mb-4 uppercase tracking-caps px-4 md:px-0">
        Districts and zone
      </div>
      <div className={classNames(styles['buyers-guide'], 'px-4 md:px-0')}>
        <ul>
          <li>Community District:</li>
          <li>City Council District:</li>
          <li>Police Precinct:</li>
          <li>Zone:</li>
          <li>Tax Lot:</li>
          <li>Block:</li>
        </ul>
        <ul>
          <li>103</li>
          <li>1</li>
          <li>7</li>
          <li>C6</li>
          <li>1003080023</li>
          <li>308 / Lot 23</li>
        </ul>
      </div>
      <div className="mt-10 mb-4 uppercase tracking-caps px-4 md:px-0">
        Education
      </div>
      <div className={classNames(styles['buyers-guide'], 'px-4 md:px-0')}>
        <ul>
          <li>School District:</li>
          <li>Elementary:</li>
          <li>Middle School:</li>
        </ul>
        <ul>
          <li>2</li>
          <li>P.S. 042 Benjamin Altman</li>
          <li>M.S. 131 (06,07,08,SE)</li>
        </ul>
      </div>
      <div className="mt-10 mb-4 uppercase tracking-caps px-4 md:px-0">
        Colleges
      </div>
      <div className={classNames(styles['buyers-guide'], 'px-4 md:px-0')}>
        <ul>
          <li>Cooper Union:</li>
          <li>Pace University:</li>
          <li>NYU:</li>
          <li>SVA:</li>
          <li>New School:</li>
          <li>Columbia:</li>
        </ul>
        <ul>
          <li>0.8 miles</li>
          <li>0.8 miles</li>
          <li>1.1 miles</li>
          <li>1.8 miles</li>
          <li>1.9 miles</li>
          <li>6.7 miles</li>
        </ul>
      </div>
      <div className="mt-10 mb-4 uppercase tracking-caps px-4 md:px-0">
        Parks
      </div>
      <div className={classNames(styles['buyers-guide'], 'px-4 md:px-0')}>
        <ul>
          <li>Sara D. Roosevelt Park:</li>
          <li>Seward Park:</li>
          <li>Straus Park:</li>
        </ul>
        <ul>
          <li>0.13 miles</li>
          <li>0.16 miles</li>
          <li>0.17 miles</li>
        </ul>
      </div>
      <div className="mt-10 mb-4 uppercase tracking-caps px-4 md:px-0">
        Museums
      </div>
      <div className={classNames(styles['buyers-guide'], 'px-4 md:px-0')}>
        <ul>
          <li>Tenement Museum:</li>
          <li>New Museum:</li>
          <li>Museum Of Chinese In America:</li>
        </ul>
        <ul>
          <li>0.17 miles</li>
          <li>0.41 miles</li>
          <li>0.46 miles</li>
        </ul>
      </div>
    </div>
  )
}
