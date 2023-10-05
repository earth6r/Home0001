import { defineConfig } from 'sanity'
import { schemaTypes } from './schemas'
import { deskTool } from 'sanity/desk'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import { media } from 'sanity-plugin-media'
import { table } from '@sanity/table'
import deskStructure, { getDefaultDocumentNode } from './parts/desk-structure'

export default defineConfig({
  name: 'Home0001',
  title: 'Home0001',
  projectId: 'cr71fv96',
  dataset: 'production',
  plugins: [
    deskTool({
      structure: deskStructure,
      defaultDocumentNode: getDefaultDocumentNode,
    }),
    vercelDeployTool(),
    media(),
    table(),
  ],
  schema: {
    types: schemaTypes,
  },
  parts: [
    {
      name: 'part:@sanity/base/schema',
      path: './schemas/index',
    },
    {
      implements: 'part:@sanity/production-preview/resolve-production-url',
      path: './parts/resolve-production-url',
    },
  ],
})
