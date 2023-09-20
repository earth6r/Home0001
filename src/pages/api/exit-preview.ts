import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  res.clearPreviewData()
  res.setDraftMode({ enable: true })
  res.redirect(`${req?.query?.path}` ?? '/')
  res.end()
}
