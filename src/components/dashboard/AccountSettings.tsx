/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC } from 'react'
import classNames from 'classnames'
import { RichText } from '@components/sanity/rich-text'
import { TypedObject } from 'sanity'
import { AccountSettingsProps } from './types'

export const AccountSettings: FC<AccountSettingsProps> = ({
  content,
  user,
  className,
}) => {
  return (
    <div className={classNames(className)}>
      <RichText
        blocks={content as TypedObject | TypedObject[]}
        className="mb-ydouble"
      />

      {/* settings */}
    </div>
  )
}

export default AccountSettings
