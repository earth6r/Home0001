import { type FC, useState } from 'react'
import Map from './Map'
import { Dialog } from '@headlessui/react'
import { MapDialogProps } from './types'
import { sendGoogleEvent } from '@lib/util/analytics'
import IconSmallBlackArrow from '@components/icons/IconSmallBlackArrow'
export const MapDialog: FC<MapDialogProps> = ({
  text,
  coordinates,
  className,
}) => {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <div className={className}>
      <div className="flex h-[2em] mt-yhalf">
        <IconSmallBlackArrow width="13" height="32" className="mr-[3px]" />
        <button
          aria-label={`Open Map`}
          onClick={() => {
            const options = { location: window.location.pathname }
            sendGoogleEvent('opened map', options)
            setIsOpen(true)
          }}
          className="hover:font-bold border-bottom mt-2 ml-2"
        >
          {text}
        </button>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed max-w-[600px] w-[calc(100%-(2*var(--space-x)))] top-ylg left-x z-header"
      >
        <Dialog.Panel className="block border-1 border-solid border-black w-full h-full bg-white">
          <Map coordinates={coordinates} />
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}

export default MapDialog
