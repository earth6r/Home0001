export default {
  name: 'seo',
  type: 'object',
  title: 'SEO',
  fields: [
    { name: 'title', type: 'string', title: 'SEO Title' },
    { name: 'description', type: 'string', title: 'Meta Description' },
    {
      name: 'keywords',
      type: 'string',
      description: 'A phrase that you want your post or page to rank for.',
      title: 'Keyphrase',
    },
    { name: 'synonyms', type: 'string', title: 'Keyword/Keyphrase Synonyms' },
  ],
  options: {
    collapsible: false,
  },
}
