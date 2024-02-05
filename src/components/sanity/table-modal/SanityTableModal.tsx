import { useState, type FC, type HTMLAttributes, useEffect } from 'react'
import { Modal } from '@components/modal'
import classNames from 'classnames'
import { sendGoogleEvent } from '@lib/util'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { useLenis } from '@studio-freight/react-lenis'

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
  const lenis = useLenis()

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
    <div className={classNames(className, '')}>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          lenis.resize()
        }}
      >
        <div className="py-[19px] md:py-[33px] px-x h-full flex flex-col text-sm overflow-y-scroll">
          <span className="fixed uppercase font-medium mb-y z-modal">
            {title}
          </span>
          <div className="fixed w-full h-[50px] md:h-[78px] top-0 white-gradient z-base"></div>

          <div className="pt-ylg">
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
                      index <= 1
                        ? 'font-sans uppercase text-h3 leading-[0.85] tracking-tight'
                        : 'my-[0.5em]',
                      cells.length > 1 ? 'grid-cols-2' : 'grid-cols-1',
                      cells.length <= 1 || (cells[1] && cells[1].length === 0)
                        ? 'font-bold font-sansText'
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
        <IconSmallArrow fill="black" width="15" height="11" />
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
