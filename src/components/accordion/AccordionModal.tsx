import React, { FC, useState } from 'react'
import { Modal } from '@components/modal'
import { AccordionModalProps } from './types'
import { Accordion } from '@components/accordion'
import Link from 'next/link'

export const AccordionModal: FC<AccordionModalProps> = ({
  accordions,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={className}>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="md:grid md:grid-cols-3 pl-4 md:pl-10 pr-menu">
          <div className="md:col-start-2 md:col-span-1 pt-6 md:pt-12">
            <h2 className="uppercase tracking-caps leading-none">
              {`How it works`}
            </h2>

            <div className="my-10">
              {accordions &&
                accordions.length > 0 &&
                accordions.map(({ _key, header, text }) => (
                  <Accordion
                    key={_key}
                    header={header}
                    text={text}
                    className="mt-2 first-of-type:mt-0"
                  />
                ))}
            </div>

            <div className="mb-10 md:mb-20 rich-text">
              <p>
                {`More questions? See our `}
                <Link href="/faq">{`FAQ`}</Link>
                {`.`}
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <button
        onClick={() => setIsOpen(true)}
        className="border-b-[1.5px] border-solid mt-4"
      >
        {`How it works`}
      </button>
    </div>
  )
}

export default AccordionModal
