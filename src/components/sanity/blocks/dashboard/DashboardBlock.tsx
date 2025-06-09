/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC } from 'react'
import Block from '../Block'
import { SanityBlockElement } from '@components/sanity/types'
import type { DashboardBlock as DashboardBlockType } from '@gen/sanity-schema'
import classNames from 'classnames'
import { DashboardContainer } from '@components/dashboard'
import { Menus as SanityMenu } from '@gen/sanity-schema'

type DashboardBlockProps = Omit<SanityBlockElement, keyof DashboardBlockType> &
  DashboardBlockType

export const DashboardBlock: FC<DashboardBlockProps> = ({
  className,
  loggedInHeader,
  dashboardCopy,
  dashboardMenu,
}) => {
  return (
    <Block className={classNames(className, 'md:pr-menu')}>
      <DashboardContainer
        content={{
          loggedInHeader,
          dashboardCopy,
          dashboardMenu: dashboardMenu as unknown as SanityMenu,
        }}
      />
    </Block>
  )
}

export default DashboardBlock
