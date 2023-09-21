export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      name: 'accordionBlock',
      type: 'accordionBlock',
      title: 'Accordion Block',
    },
    {
      name: 'figuresBlock',
      type: 'figuresBlock',
      title: 'Figures Block',
    },
    {
      name: 'textBlock',
      type: 'textBlock',
      title: 'Text Block',
    },
    {
      name: 'waitlistBlock',
      type: 'waitlistBlock',
      title: 'Waitlist Form',
    },
  ],
}
