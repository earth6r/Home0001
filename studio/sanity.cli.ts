import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'cr71fv96',
    dataset: 'dev',
  },
  project: {
    basePath: '/studio',
  },
})
