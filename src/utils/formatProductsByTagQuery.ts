export const formatProductsByTagQuery = (
  format: string,
  queryParams: string[]
): string => {
  const query = `tag: ${format} AND tag:[${queryParams.map((param) => {
    return `${param}`
  })}]`
  return query
}
