import { TypedObject } from 'sanity'
import type { Menus as SanityMenu } from '@gen/sanity-schema'
import { Web3UserProps } from '@contexts/web3'

export type DashboardContainerProps = {
  user?: Web3UserProps
  content: {
    loggedInHeader?: TypedObject | TypedObject[]
    dashboardCopy?: TypedObject | TypedObject[]
  }
  className?: string
}

export type DashboardSidebarProps = {
  user?: Web3UserProps
  menu?: SanityMenu
  imageUrl?: string | null
  className?: string
}

export type AccountSettingsProps = {
  content: TypedObject | TypedObject[]
  user?: Web3UserProps
  className?: string
}
