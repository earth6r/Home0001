import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import { schemaTypes } from './schemas'
import deskStructure, { getDefaultDocumentNode } from './parts/desk-structure'

export default defineConfig({
  name: 'Home0001',
  title: 'Home0001',
  projectId: 'cr71fv96',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    deskTool({
      structure: deskStructure,
      defaultDocumentNode: getDefaultDocumentNode,
    }),
    vercelDeployTool(),
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
