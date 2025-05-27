/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC } from 'react'
import Block from '../Block'
import { SanityBlockElement } from '@components/sanity/types'
import type { Web3Block as Web3BlockType } from '@gen/sanity-schema'
import classNames from 'classnames'
import { ApplicationContainer } from '@components/apply'

type Web3BlockProps = Omit<SanityBlockElement, keyof Web3BlockType> &
  Web3BlockType

export const Web3Block: FC<Web3BlockProps> = ({
  className,
  header,
  loggedInHeader,
  dashboardCopy,
  joiningFee,
}) => {
  return (
    <Block className={classNames(className, 'grid md:grid-cols-2')}>
      <ApplicationContainer
        content={{ header, joiningFee, loggedInHeader, dashboardCopy }}
      />
    </Block>
  )
}

export default Web3Block
