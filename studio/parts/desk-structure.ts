import type { SanityDocument } from '@sanity/types'
import { GrSettingsOption } from 'react-icons/gr'
import { RiFileList3Line } from 'react-icons/ri'
import { StructureBuilder } from 'sanity/desk'

export const getDefaultDocumentNode = (S: StructureBuilder) => {
  return S.document().views([S.view.form()])
}

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(GrSettingsOption)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
      S.divider(),
      S.listItem()
        .title('Pages')
        .child(S.documentTypeList('page').title('Pages'))
        .icon(RiFileList3Line),
      S.divider(),
      S.listItem()
        .title('Menus')
        .child(
          S.documentTypeList('menus')
            .title('Menus')
            .filter('_type == $type')
            .params({ type: 'menus' })
        ),
    ])

export default deskStructure
