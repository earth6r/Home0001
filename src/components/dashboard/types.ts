import { Web3UserProps } from '@contexts/web3'
import { FormEvent, ReactNode } from 'react'
import { TypedObject } from 'sanity'

export type DashboardContainerProps = {
  content: {
    loggedInHeader?: TypedObject | TypedObject[]
    dashboardCopy?: TypedObject | TypedObject[]
  }
  className?: string
}
