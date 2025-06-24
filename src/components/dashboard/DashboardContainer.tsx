/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC, memo } from 'react'
import classNames from 'classnames'
import { RichText } from '@components/sanity/rich-text'
import { TypedObject } from 'sanity'
import DashboardSteps from './DashboardSteps'
import { DashboardContainerProps } from './types'

export const DashboardContainerComponent: FC<DashboardContainerProps> = ({
  user,
  updateUser,
  content,
  className,
}) => {
  return (
    <div className={classNames(className)}>
      <RichText
        blocks={content.loggedInHeader as TypedObject | TypedObject[]}
        className="mb-ydouble"
      />

      <DashboardSteps
        user={user}
        updateUser={updateUser}
        dashboardCopy={content.dashboardCopy}
        className="mt-y"
      />
    </div>
  )
}

export const DashboardContainer = memo(DashboardContainerComponent)

export default DashboardContainer
