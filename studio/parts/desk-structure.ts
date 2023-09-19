import S from '@sanity/desk-tool/structure-builder'
import type { SanityDocument } from '@sanity/types'
import { GrSettingsOption } from 'react-icons/gr'
import { RiFileList3Line } from 'react-icons/ri'
import Iframe from 'sanity-plugin-iframe-pane'
import SeoPane from 'sanity-plugin-seo-pane'
import resolveProductionUrl from './resolve-production-url'

export const getDefaultDocumentNode: typeof S.document = () => {
  return S.document().views([
    S.view.form(),
    S.view
      .component(Iframe)
      .options({
        url: (doc: SanityDocument) => resolveProductionUrl(doc),
      })
      .title('Preview'),
    S.view
      .component(SeoPane)
      .options({
        keywords: 'seo.keywords',
        synonyms: 'seo.synonyms',
        url: (doc: SanityDocument) => resolveProductionUrl(doc),
      })
      .title('SEO'),
  ])
}

export default S.list()
  .title('Content')
  .items([
    S.listItem()
      .title('Settings')
      .child(
        S.document()
          .schemaType('siteSettings')
          .documentId('siteSettings')
          .title('Site Settings')
      )
      .icon(GrSettingsOption),
    S.listItem()
      .title('Pages')
      .child(S.documentTypeList('page').title('Pages'))
      .icon(RiFileList3Line),
  ])
