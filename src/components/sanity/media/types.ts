import type { HTMLAttributes } from 'react'
import type { FileAsset, ImageAsset } from '@sanity/types'
import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import type { TypedObject } from '@portabletext/types'
import type { ImageProps } from 'next/image'
import type { Video } from '@gen/sanity-schema'

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

export interface SanityVideoProps extends HTMLAttributes<HTMLVideoElement> {
  video: SanityVideoType
}

export interface SanityImageProps extends Omit<ImageProps, 'src'> {
  sizes?: string
}

export interface SanityMediaProps
  extends HTMLAttributes<HTMLImageElement | HTMLVideoElement> {
  image?: SanityImageObject
  imageProps?: SanityImageProps
  video?: SanityVideoType
  mediaRatio?: number | null
  caption?: TypedObject | TypedObject[]
}
