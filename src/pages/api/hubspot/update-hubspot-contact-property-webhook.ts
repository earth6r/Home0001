import type { NextApiRequest, NextApiResponse } from 'next/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  console.error('Request body:', req.body)

  res.status(200).json({
    status: 'success',
  })
}
