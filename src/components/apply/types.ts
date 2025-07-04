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
    joiningFee?: number | null
  }
  className?: string
}

export type PaneProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  isSubmitting?: boolean
  className?: string
  id?: string
  buttonText?: string
  children?: ReactNode
}

export type FormProps = {
  className?: string
  user: Web3UserProps
  updateUser: (arg0: any) => void
  joiningFee?: number | null
  cryptoPrice?: number[]
}
