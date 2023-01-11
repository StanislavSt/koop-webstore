import { Filters } from '../graphql/cache'

export const formatProductsQueryByFilters = (filters: Filters): string => {
  if (!filters) return ''

  if (filters.technique)
    return `tag:${filters.format} AND tag:${filters.technique}`

  return `tag:${filters.format}`
}
