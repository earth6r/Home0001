import { type FC, useState } from 'react'
import { Modal } from '@components/modal'
import { AllenData, LAData } from '@lib/factSheets'
import slugify from 'slugify'
import { FactSheetProps } from './types'

export const FactSheet: FC<FactSheetProps> = ({ unit, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const slugifiedCity =
    unit?.property?.location?.title &&
    slugify(unit.property.location?.title, { lower: true })

  return (
    <div className={className}>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="py-6 md:py-10 md:px-10 h-full flex flex-col">
          <p className="px-4 md:px-0 uppercase">Fact Sheet</p>
          <div className="mt-10 tracking-caps px-4 md:px-0">
            <p className="uppercase">
              <span>{unit?.propertyType?.typeTitle}</span>
              <span>&nbsp;—&nbsp;</span>
              <span>{unit?.title}</span>
            </p>
          </div>
          {slugifiedCity == 'nyc' ? (
            <AllenData type={unit?.propertyType?.typeValue} area={unit?.area} />
          ) : (
            <LAData />
          )}
        </div>
      </Modal>

      <div className="pr-mobile-menu md:pr-0">
        <button
          onClick={() => setIsOpen(true)}
          className="outline-none mt-9 mb-9 tracking-caps block w-full h-12 max-h-12 py-2 px-3 text-center uppercase border-1 border-solid border-black bg-white text-black"
        >
          {`Fact sheet`}
        </button>
      </div>
    </div>
  )
}

export default FactSheet
