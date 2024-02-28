import { type FC, useState } from 'react'
import Map from './Map'
import { Dialog } from '@headlessui/react'
import { MapDialogProps } from './types'
import { sendGoogleEvent } from '@lib/util/analytics'
import IconSmallArrow from '@components/icons/IconSmallArrow'
export const MapDialog: FC<MapDialogProps> = ({
  text,
  coordinates,
  className,
}) => {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <div className={className}>
      <div className="flex items-center gap-[3px] hover:gap-[6px] h-[1em] mt-y transition-all duration-300">
        <button
          aria-label={`Open Map`}
          onClick={() => {
            const options = { location: window.location.pathname }
            sendGoogleEvent('opened map', options)
            setIsOpen(true)
          }}
          className="h-[2em]"
        >
          <span className="font-sansText uppercase underline decoration-[2px] underline-offset-2">
            {text}
          </span>
        </button>
        <IconSmallArrow
          width="16"
          height="12"
          fill="black"
          className="mt-[1px] transform -rotate-45"
        />
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed max-w-[600px] w-[calc(100%-(2*var(--space-x)))] top-ydouble left-x z-header"
      >
        <Dialog.Panel className="block border-1 border-solid border-black w-full h-full bg-white">
          <Map coordinates={coordinates} />
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}

export default MapDialog
