import { type FC, useState } from 'react'
import Map from './Map'
import { Dialog } from '@headlessui/react'
import { MapDialogProps } from './types'

export const MapDialog: FC<MapDialogProps> = ({
  text,
  coordinates,
  className,
}) => {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <div className={className}>
      <button
        aria-label={`Open Map`}
        onClick={() => setIsOpen(true)}
        className="hover:font-bold text-mobile-body md:text-desktop-body border-b-[1.5px] border-solid"
      >
        {text}
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed max-w-[600px] w-full top-ylg left-x z-header"
      >
        <Dialog.Panel className="block border-1 border-solid border-black w-full h-full bg-white">
          <Map coordinates={coordinates} />
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}

export default MapDialog