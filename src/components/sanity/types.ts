import type { HTMLAttributes } from 'react'
import type { TypedObject } from '@portabletext/types'
import { Web3UserProps } from '@contexts/web3'

export interface SanityBlockElement extends HTMLAttributes<HTMLElement> {
  index?: number
  grid?: boolean
  blocks: TypedObject | TypedObject[]
  user?: Web3UserProps
  updateUser?: (user: Web3UserProps) => void
}
