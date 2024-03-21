import { FaLocationDot } from 'react-icons/fa6'
import { GrSettingsOption } from 'react-icons/gr'
import { MdHomeWork } from 'react-icons/md'
import { RiFileList3Line } from 'react-icons/ri'
import { StructureBuilder } from 'sanity/desk'
import { MdMeetingRoom } from 'react-icons/md'
import type { SanityDocument } from '@sanity/types'
import Iframe from 'sanity-plugin-iframe-pane'
import resolveProductionUrl from './resolve-production-url'

export const getDefaultDocumentNode = (S: StructureBuilder) => {
  return S.document().views([
    S.view.form(),
    S.view
      .component(Iframe)
      .options({
        url: (doc: SanityDocument) => resolveProductionUrl(doc),
      })
      .title('Preview'),
  ])
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
        .title('Cities')
        .child(S.documentTypeList('city').title('Cities'))
        .icon(FaLocationDot),
      S.listItem()
        .title('Properties')
        .child(S.documentTypeList('property').title('Properties'))
        .icon(MdHomeWork),
      S.listItem()
        .title('Units')
        .child(S.documentTypeList('unit').title('Units'))
        .icon(MdMeetingRoom),
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
