import { toPlainText } from '@portabletext/toolkit'
import type { PortableTextBlock } from '@portabletext/types'
import slugify from 'slugify'
import type { PlainText } from '@gen/sanity-schema'
import type { BlockHeading } from '../types'

type SlugifyOptions = Parameters<typeof slugify>[1]

type GetBlockHeading = (
  titleBlock: PortableTextBlock | PlainText | string | undefined,
  optionalSlug?: string,
  options?: SlugifyOptions
) => BlockHeading | undefined

const defaultOptions: SlugifyOptions = { lower: true }

export const getBlockHeading: GetBlockHeading = (
  titleBlock,
  optionalSlug,
  options = {}
) => {
  let title: string | undefined
  if (typeof titleBlock === 'string') {
    title = titleBlock
  } else {
    // convert portable text to plain text to account for the
    // string equivalent of a falsy value ('')
    title = titleBlock && toPlainText(titleBlock)
  }
  if (!titleBlock || !title) return
  const slugifyOpts =
    typeof options === 'string' ? options : { ...defaultOptions, ...options }
  const slug = optionalSlug || slugify(title, slugifyOpts)
  return {
    title,
    slug,
  }
}

export default getBlockHeading
