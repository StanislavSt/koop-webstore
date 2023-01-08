import { getPlaiceholder } from 'plaiceholder'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req
  const { url } = JSON.parse(body)
  const { base64 } = await getPlaiceholder(url)

  res.status(200).json(base64)
}
