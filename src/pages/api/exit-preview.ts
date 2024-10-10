import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  res.clearPreviewData()
  res.setDraftMode({ enable: false })
  res.redirect((req?.query?.path as string) || '/')
  res.end()
}
