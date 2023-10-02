import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'cr71fv96',
    dataset: 'production',
  },
  project: {
    basePath: '/studio',
  },
})
