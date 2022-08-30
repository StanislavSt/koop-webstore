import S from '@sanity/desk-tool/structure-builder'

// prettier-ignore
export const authors = S.listItem()
  .title('Authors')
  .schemaType('author')
  .child(
    S.documentTypeList('author')
  )
