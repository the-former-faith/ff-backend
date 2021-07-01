import { FaLink } from 'react-icons/fa/'
import docMetadata from './docMetadata'

export default {
  name: 'postLink',
  title: 'Link Post',
  icon: FaLink,
  type: 'document',
  fields: [
    {
      name: 'source',
      title: 'Source URL',
      type: 'url',
      validation: Rule => Rule.required()
    },
    ...docMetadata,
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      validation: Rule => Rule.unique().error('You already have that category listed.'),
      of: [{type: 'reference', to: {type: 'category'}}],
      fieldset: 'metadata'
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
