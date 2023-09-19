export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      name: 'textBlock',
      type: 'textBlock',
      title: 'Text Block',
    },
    {
      name: 'figuresBlock',
      type: 'figuresBlock',
      title: 'Figures Block',
    },
  ],
}
