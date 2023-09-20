import type { SanityCodegenConfig } from 'sanity-codegen'

const config: SanityCodegenConfig = {
  schemaPath: './studio/schemas',
  outputPath: './studio/gen/sanity-schema.ts',
}

export default config
