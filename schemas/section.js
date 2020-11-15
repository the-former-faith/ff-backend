import { FaParagraph } from 'react-icons/fa'

export default {
  name: 'section',
  title: 'Section',
  icon: FaParagraph,
  type: 'object',
  fields: [
    {
      name: 'headingText',
      title: 'Heading Text',
      type: 'localeString',
      fieldset: 'heading'
    },
    {
      name: 'headingLevel',
      title: 'Heading Level',
      type: 'string',
      fieldset: 'heading',
      options: {
        list: ['h2','h3','h4','h5','h6']
      }
    },
    {
      name: 'content',
      title: 'Section Content',
      type: 'localeAdvancedBlockContent'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'person'}
    },
    {
      name: 'sectionImage',
      title: 'Section Image',
      type: 'imageObject',
      fieldset: 'appearance'
    },
    {
      name: 'sectionColor',
      title: 'Section Color',
      type: 'color',
      fieldset: 'appearance'
    },
    {
      name: 'sectionAttachment',
      title: 'Section Attachment',
      type: 'file',
      fieldset: 'appearance'
    }
  ],
  fieldsets: [
    {
      name: 'heading', 
      title: 'Section Heading',
      options: {
        columns: 2
      }
    },
    {
      name: 'appearance',
      title: 'Appearance',
      description: 'These are fields that themes will use in different ways.',
      options: {
        collapsible: true, 
        collapsed: true
      },
    }
  ],
  preview: {
    select: {
      title: 'headingText.en',
      author: 'author.name',
      media: 'sectionImage.imageFile.image'
    }
  }
}
