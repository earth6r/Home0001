import { HTMLAttributes } from 'react'
import type { Accordion, SanityKeyed } from '@studio/gen/sanity-schema'

export interface AccordionModalProps extends HTMLAttributes<HTMLElement> {
  accordions?: SanityKeyed<Accordion>[]
}
