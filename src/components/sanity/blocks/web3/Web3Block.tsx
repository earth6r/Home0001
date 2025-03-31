import React, { FC } from 'react'
import Block from '../Block'
import { SanityBlockElement } from '@components/sanity/types'
import type { Web3Block as Web3BlockType } from '@gen/sanity-schema'
import classNames from 'classnames'
import { RichText } from '@components/sanity/rich-text'

// Yan web3 block

type Web3BlockProps = Omit<SanityBlockElement, keyof Web3BlockType> &
  Web3BlockType

export const Web3Block: FC<Web3BlockProps> = ({ className, header }) => {
  return (
    <Block className={classNames(className)}>
      {header && <RichText blocks={header} />}
    </Block>
  )
}

export default Web3Block
