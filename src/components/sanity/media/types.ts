import type { HTMLAttributes } from 'react'
import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import type { TypedObject } from '@portabletext/types'
import type { ImageProps } from 'next/image'
import {
  SanityImageAsset,
  SanityImageCrop,
  SanityImageHotspot,
} from 'sanity-codegen'

export interface SanityImageProps extends Omit<ImageProps, 'src'> {
  sizes?: string
  lqip?: string
  options?: { aspectRadio: boolean }
}

export interface SanityMediaProps extends HTMLAttributes<HTMLImageElement> {
  alt?: string
  image?: {
    asset: SanityImageAsset
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot
  }
  imageProps?: SanityImageProps
  onLoadingComplete?: () => void
  mediaRatio?: number | null
  caption?: TypedObject | TypedObject[]
}
