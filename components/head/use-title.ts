import { useState, useCallback, useEffect } from 'react'
import type { HeadTitleProps } from './types'

const getHeadTitle = ({
  seoTitle,
  pageTitle,
  siteTitle,
}: HeadTitleProps): string => {
  if (seoTitle) return seoTitle
  if (pageTitle) return `${pageTitle} | ${siteTitle}`
  return siteTitle
}

export const useHeadTitle = ({
  seoTitle,
  pageTitle,
  siteTitle,
}: HeadTitleProps): string => {
  const getTitle = useCallback(
    () => getHeadTitle({ seoTitle, pageTitle, siteTitle }),
    [seoTitle, pageTitle, siteTitle]
  )
  const [title, setTitle] = useState(getTitle)
  useEffect(() => setTitle(getTitle()), [getTitle])
  return title
}

export default useHeadTitle
