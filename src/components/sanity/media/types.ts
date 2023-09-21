import type { HTMLAttributes } from 'react'
import type { FileAsset, ImageAsset } from '@sanity/types'
import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import type { TypedObject } from '@portabletext/types'
import type { ImageProps } from 'next/image'

export interface SanityImageProps extends Omit<ImageProps, 'src'> {
  sizes?: string
}

export interface SanityMediaProps extends HTMLAttributes<HTMLImageElement> {
  image?: SanityImageObject
  imageProps?: SanityImageProps
  mediaRatio?: number | null
  caption?: TypedObject | TypedObject[]
}
