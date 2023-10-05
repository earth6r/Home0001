import { useState, type FC, type HTMLAttributes } from 'react'
import { Modal } from '@components/modal'
import classNames from 'classnames'

interface SanityTableModalProps extends HTMLAttributes<HTMLElement> {
  table: any
}

export const SanityTableModal: FC<SanityTableModalProps> = ({
  table,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={className}>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="py-6 md:py-10 px-10 h-full flex flex-col">
          <div className="">
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
                            i === 0 ? 'w-[250px] xs:w-[300px] md:w-[200px]' : ''
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

export default SanityTableModal
