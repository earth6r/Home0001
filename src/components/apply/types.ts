import { Web3UserProps } from '@contexts/web3'
import { FormEvent, ReactNode } from 'react'
import { TypedObject } from 'sanity'

declare global {
  interface Window {
    ethereum?: any
  }
}

export type ApplicationContainerProps = {
  content: {
    header?: TypedObject | TypedObject[]
    joiningFee?: number
  }
  className?: string
}

export type PaneProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  isSubmitting?: boolean
  className?: string
  id?: string
  children?: ReactNode
}

export type FormProps = {
  className?: string
  user: Web3UserProps
  setUser: (arg0: any) => void
  joiningFee?: number
  cryptoPrice?: number[]
}
