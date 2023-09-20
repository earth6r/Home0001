import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Helper method to wait for a middleware to execute before continuing
 * and to throw an error when an error happens in a middleware
 */
export const initMiddleware = (middleware: any) => {
  return (req: NextApiRequest, res: NextApiResponse): any =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

export default initMiddleware
