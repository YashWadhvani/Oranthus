import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // During development and after seeding, useCdn should be false so changes appear immediately.
  useCdn: false,
})
