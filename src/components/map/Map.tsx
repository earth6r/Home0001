import { type FC, useState } from 'react'
import jsStyles from './googleMapStyles'
import GoogleMapReact from 'google-map-react'
import { MapDialogProps } from './types'
import classNames from 'classnames'
import styles from './map.module.css'

const MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID

export const Map: FC<MapDialogProps> = ({ coordinates }) => {
  if (!coordinates?.lat || !coordinates.long) return null
  const numLat = parseFloat(coordinates.lat)
  const numLong = parseFloat(coordinates.long)

  const mapOptions = {
    gesturehandling: 'none',
    styles: jsStyles,
  }

  let center = {
    lat: numLat,
    lng: numLong,
  }

  let zoomLevel = 14
  if (numLat <= 22 && numLat >= 20) {
    if (numLong <= -87 && numLong >= -89) {
      zoomLevel = 13
    }
  }

  return (
    <div
      className={classNames(styles['map-module-wrapper'])}
      style={{ height: '600px', width: '100%' }}
    >
      {MAP_API_KEY && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAP_API_KEY }}
          options={mapOptions}
          defaultCenter={center}
          defaultZoom={zoomLevel}
        >
          <div className={styles['location-circle']}></div>
        </GoogleMapReact>
      )}
    </div>
  )
}
export default Map
