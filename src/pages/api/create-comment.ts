import type { NextApiRequest, NextApiResponse } from 'next'
import { rwClient } from '@studio/lib'

type Data = {
  message: string
  error?: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const { _id, name, email, comment } = JSON.parse(req.body)
  try {
    await rwClient.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Couldn't submit comment", error })
  }
  return res.status(200).json({ message: 'Comment submitted' })
}
