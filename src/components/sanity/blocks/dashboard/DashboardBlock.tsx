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
import { Web3UserProps } from '@contexts/web3'

type DashboardBlockProps = Omit<SanityBlockElement, keyof DashboardBlockType> &
  DashboardBlockType & {
    user?: Web3UserProps
    updateUser?: (user: Web3UserProps) => void
  }

export const DashboardBlock: FC<DashboardBlockProps> = ({
  className,
  user,
  updateUser,
  applyHeader,
  loggedInHeader,
  dashboardCopy,
}) => {
  return (
    <Block className={classNames(className)}>
      {user && user.hasFinishedProfile ? (
        <DashboardContainer
          className="md:pr-menu"
          user={user}
          updateUser={updateUser}
          content={{
            loggedInHeader,
            dashboardCopy,
          }}
        />
      ) : (
        <ApplicationContainer content={{ header: applyHeader }} />
      )}
    </Block>
  )
}

export default DashboardBlock
