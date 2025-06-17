/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC } from 'react'
import Block from '../Block'
import { SanityBlockElement } from '@components/sanity/types'
import type { DashboardBlock as DashboardBlockType } from '@gen/sanity-schema'
import classNames from 'classnames'
import { DashboardContainer } from '@components/dashboard'
import { Menus as SanityMenu } from '@gen/sanity-schema'
import { ApplicationContainer } from '@components/apply'

type DashboardBlockProps = Omit<SanityBlockElement, keyof DashboardBlockType> &
  DashboardBlockType

export const DashboardBlock: FC<DashboardBlockProps> = ({
  className,
  user,
  applyHeader,
  joiningFee,
  loggedInHeader,
  dashboardCopy,
}) => {
  return (
    <Block className={classNames(className)}>
      {user && user.hasFinishedProfile ? (
        <DashboardContainer
          className="md:pr-menu"
          user={user}
          content={{
            loggedInHeader,
            dashboardCopy,
          }}
        />
      ) : (
        <ApplicationContainer content={{ header: applyHeader, joiningFee }} />
      )}
    </Block>
  )
}

export default DashboardBlock
