import { defineCliConfig } from 'sanity/cli'

const DATASET = process.env.SANITY_STUDIO_API_DATASET

export default defineCliConfig({
  api: {
    projectId: 'cr71fv96',
    dataset: DATASET,
  },
  project: {
    basePath: '/studio',
  },
})
