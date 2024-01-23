import { useState, type FC, type HTMLAttributes } from 'react'
import { Modal } from '@components/modal'
import classNames from 'classnames'
import { sendGoogleEvent } from '@lib/util'
import IconSmallBlackArrow from '@components/icons/IconSmallBlackArrow'

interface SanityTableModalProps extends HTMLAttributes<HTMLElement> {
  table: any
  title: string
  modalType: 'fact sheet' | 'inventory'
  buttonLabel: string
  unit?: string
}

export const SanityTableModal: FC<SanityTableModalProps> = ({
  table,
  title,
  modalType,
  buttonLabel,
  className,
  unit,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleGoogleEvent = () => {
    if (unit) {
      switch (modalType) {
        case 'fact sheet': {
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
        <div className="py-[19px] md:py-11 px-x md:px-xhalf h-full flex flex-col text-sm overflow-y-scroll">
          <span className="uppercase font-medium mb-y">{title}</span>

          <div className="pb-y">
            {table.rows &&
              table.rows.length > 0 &&
              table.rows.map(
                (
                  { _key, cells }: { _key: number; cells: string[] },
                  index: number
                ) => (
                  <div
                    key={_key}
                    className={classNames(
                      index <= 1 || (modalType === 'inventory' && index === 2)
                        ? 'uppercase text-lg leading-[0.85]'
                        : 'my-[0.5em]',
                      cells.length > 1 ? 'grid-cols-2' : 'grid-cols-1',
                      cells.length <= 1 || (cells[1] && cells[1].length === 0)
                        ? 'font-bold'
                        : '',
                      'grid min-h-[10px]'
                    )}
                  >
                    {cells &&
                      cells.length > 0 &&
                      cells.map((cell: string, i: number) => (
                        <div key={cell + i}>{cell}</div>
                      ))}
                  </div>
                )
              )}
          </div>
        </div>
      </Modal>

      <div className="flex items-center gap-[5px] py-[4px] px-[6px] border-black">
        <IconSmallBlackArrow width="13" height="9" />
        <button
          onClick={() => {
            setIsOpen(true)
            handleGoogleEvent()
          }}
          className="uppercase font-medium leading-none"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

export default SanityTableModal
