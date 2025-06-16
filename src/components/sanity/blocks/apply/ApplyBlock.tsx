/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC } from 'react'
import Block from '../Block'
import { SanityBlockElement } from '@components/sanity/types'
import type { ApplyBlock as ApplyBlockType } from '@gen/sanity-schema'
import classNames from 'classnames'
import { ApplicationContainer } from '@components/apply'

type ApplyBlockProps = Omit<SanityBlockElement, keyof ApplyBlockType> &
  ApplyBlockType

export const ApplyBlock: FC<ApplyBlockProps> = ({
  className,
  applyHeader,
  joiningFee,
}) => {
  return (
    <Block className={classNames(className, 'grid md:grid-cols-2')}>
      <ApplicationContainer content={{ header: applyHeader, joiningFee }} />
    </Block>
  )
}

export default ApplyBlock
