import { useState, type FC, type HTMLAttributes } from 'react'
import { Modal } from '@components/modal'
import classNames from 'classnames'
import { sendGoogleEvent } from '@lib/util'
import IconSmallBlackArrow from '@components/icons/IconSmallBlackArrow'

interface SanityTableModalProps extends HTMLAttributes<HTMLElement> {
  table: any
  modalType: 'View Fact Sheet' | 'inventory'
  unit?: string
}

export const SanityTableModal: FC<SanityTableModalProps> = ({
  table,
  modalType,
  className,
  unit,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleGoogleEvent = () => {
    if (unit) {
      switch (modalType) {
        case 'View Fact Sheet': {
          const options = { location: window.location.pathname }
          sendGoogleEvent('clicked fact sheet', options)
          break
        }
        case 'inventory': {
          const options = { location: window.location.pathname }
          sendGoogleEvent('clicked inventory', options)
          break
        }
      }
    }
  }
  return (
    <div className={className}>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="py-6 md:py-10 px-x md:px-10 h-full flex flex-col text-sm font-bold overflow-y-scroll">
          <div className="pb-y">
            {table.rows &&
              table.rows.length > 0 &&
              table.rows.map(
                ({ _key, cells }: { _key: number; cells: string[] }) => (
                  <div
                    key={_key}
                    className="flex flex-nowrap min-h-[10px] my-[0.5em]"
                  >
                    {cells &&
                      cells.length > 0 &&
                      cells.map((cell: string, i: number) => (
                        <div
                          key={cell + i}
                          className={classNames(
                            i === 0
                              ? 'w-[250px] xs:w-[300px] md:w-[200px]'
                              : 'w-[calc(100%-250px)]'
                          )}
                        >
                          {cell}
                        </div>
                      ))}
                  </div>
                )
              )}
          </div>
        </div>
      </Modal>

      <div className="pr-mobile-menu md:pr-0 flex mt-2">
        <IconSmallBlackArrow
          width="20"
          height="32"
          className="mt-[3px] mr-[4px]"
        />
        <button
          onClick={() => {
            setIsOpen(true)
            handleGoogleEvent()
          }}
          className="font-bold border-bottom mt-2 mb-8 ml-2"
        >
          {modalType}
        </button>
      </div>
    </div>
  )
}

export default SanityTableModal
