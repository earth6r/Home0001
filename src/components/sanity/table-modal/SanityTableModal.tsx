import { useState, type FC, type HTMLAttributes, useEffect } from 'react'
import { Modal } from '@components/modal'
import classNames from 'classnames'
import { sendGoogleEvent } from '@lib/util'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { useLenis } from '@studio-freight/react-lenis'
import { ArrowBtn } from '@components/btns'

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
        title={title}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          lenis.resize()
        }}
      >
        <div className="pt-header pb-[6rem] md:pb-ydouble px-x h-full flex flex-col text-sm overflow-y-scroll">
          <div>
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
                      index <= 1 ? 'text-h3' : 'my-[0.5em]',
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

      <ArrowBtn
        onClick={() => {
          setIsOpen(true)
          handleGoogleEvent()
        }}
        text={buttonLabel}
        background="white"
      />
    </div>
  )
}

export default SanityTableModal
