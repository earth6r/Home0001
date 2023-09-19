import type { HTMLAttributes } from 'react'
import type { TypedObject } from '@portabletext/types'

export interface SanityBlockElement extends HTMLAttributes<HTMLElement> {
  index?: number
  blocks: TypedObject | TypedObject[]
}
