import { FaFileAlt } from 'react-icons/fa/'
import docMetadata from './docMetadata'

export default {
  name: 'post',
  title: 'Post',
  icon: FaFileAlt,
  type: 'document',
  fields: [
    ...docMetadata,
    {
      name: 'sections',
      title: 'Post Content Sections',
      description: 'Click on a section title to edit the content',
      type: 'array',
      of: [{type: 'section'}],
      options: {editModal:'fullscreen'}
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      validation: Rule => Rule.unique().error('You already have that category listed.'),
      of: [{type: 'reference', to: {type: 'category'}}],
      fieldset: 'metadata'
    },
    {
      title: 'Theme',
      name: 'theme',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'defaultTheme'},
          {title: 'Victorian', value: 'victorian'}
        ]
      }
    },
  ],
  fieldsets: [
    {
      name: 'metadata', 
      title: 'Metadata',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  initialValue: {
    theme: 'defaultTheme'
  },
  preview: {
    select: {
      title: 'title.en',
      author: 'author.name',
      media: 'mainImage.file'
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      })
    }
  }
}
