import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '9aorl5mj',
  dataset: 'production',
  apiVersion: '2021-10-21',
})
