/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC } from 'react'
import Block from '../Block'
import { SanityBlockElement } from '@components/sanity/types'
import type { AccountBlock as AccountBlockType } from '@gen/sanity-schema'
import classNames from 'classnames'
import AccountSettings from '@components/dashboard/AccountSettings'
import { TypedObject } from 'sanity'

type AccountBlockProps = Omit<SanityBlockElement, keyof AccountBlockType> &
  AccountBlockType & {
    updateUser?: (user: any) => void
  }

export const AccountBlock: FC<AccountBlockProps> = ({
  className,
  user,
  updateUser,
  content,
}) => {
  return (
    <Block className={classNames(className, 'md:pr-menu')}>
      <AccountSettings
        user={user}
        updateUser={updateUser}
        content={content as TypedObject | TypedObject[]}
      />
    </Block>
  )
}

export default AccountBlock
