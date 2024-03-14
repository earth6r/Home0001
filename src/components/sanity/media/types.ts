import type { HTMLAttributes } from 'react'
import type { TypedObject } from '@portabletext/types'
import type { ImageProps } from 'next/image'
import {
  SanityImageAsset,
  SanityImageCrop,
  SanityImageHotspot,
} from 'sanity-codegen'
import { Video } from '@studio/gen/sanity-schema'
import { FileAsset, ImageAsset } from 'sanity'

export interface SanityVideoType
  extends Omit<Video, 'files' | 'caption' | 'poster'> {
  files?: {
    _key: string
    asset: FileAsset
  }[]
  poster?: {
    asset: ImageAsset
  }
}

export interface SanityImageProps extends Omit<ImageProps, 'src'> {
  sizes?: string
  lqip?: string
  options?: { aspectRadio: boolean }
}

export interface SanityVideoProps extends HTMLAttributes<HTMLVideoElement> {
  video: SanityVideoType
  muted?: boolean
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
  video?: SanityVideoType
  mediaRatio?: number | null
  caption?: TypedObject | TypedObject[]
}
