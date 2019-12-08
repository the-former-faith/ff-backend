import Indent from 'react-icons/lib/fa/paragraph'

export default {
  name: 'section',
  title: 'Section',
  icon: Indent,
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'localeString'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'person'}
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'content',
      title: 'Section Content',
      type: 'localeAdvancedBlockContent'
    },
    {
      name: 'sections',
      title: 'Sub Sections',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'section'}]
      }]
    },
    {
      name: 'appearance',
      title: 'Appearance',
      description: 'These are fields that themes will use in different ways.',
      type: 'object',
      options: {
        collapsible: true, 
        collapsed: true
      },
      fields: [
        {
          name: 'sectionImage',
          title: 'Section Image',
          type: 'localeImage'
        },
        {
          name: 'sectionColor',
          title: 'Section Color',
          type: 'color'
        },
        {
          name: 'sectionAttachment',
          title: 'Section Attachment',
          type: 'file'
        },
      ]
    }
  ],
  preview: {
    select: {
      title: 'heading.en',
      author: 'author.name',
      media: 'sectionImage.en'
    }
  }
}
