/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC } from 'react'
import Block from '../Block'
import { SanityBlockElement } from '@components/sanity/types'
import type { DashboardBlock as DashboardBlockType } from '@gen/sanity-schema'
import classNames from 'classnames'
import { DashboardContainer } from '@components/dashboard'

type DashboardBlockProps = Omit<SanityBlockElement, keyof DashboardBlockType> &
  DashboardBlockType

export const DashboardBlock: FC<DashboardBlockProps> = ({
  className,
  loggedInHeader,
  dashboardCopy,
}) => {
  return (
    <Block className={classNames(className, 'grid md:grid-cols-2')}>
      <DashboardContainer content={{ loggedInHeader, dashboardCopy }} />
    </Block>
  )
}

export default DashboardBlock
