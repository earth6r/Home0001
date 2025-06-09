import { TypedObject } from 'sanity'
import type { Menus as SanityMenu } from '@gen/sanity-schema'

export type DashboardContainerProps = {
  content: {
    loggedInHeader?: TypedObject | TypedObject[]
    dashboardCopy?: TypedObject | TypedObject[]
    dashboardMenu?: SanityMenu
  }
  className?: string
}
