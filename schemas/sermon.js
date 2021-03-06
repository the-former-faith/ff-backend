import { object } from 'prop-types'
import { GiPublicSpeaker } from 'react-icons/gi/'
import docMetadata from './docMetadata'

export default {
  name: 'sermon',
  icon: GiPublicSpeaker,
  type: 'document',
  fields: [
    ...docMetadata,
    {
      name: 'narrations',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            type: 'file',
            name: 'File',
            title: 'Audio or Video File'
          },
          {
            type: 'string',
            name: 'lang',
            title: 'Language',
            options: {
              list: ['en','sw']
            }
          },
          {
            name: 'narrator',
            type: 'reference',
            to: [
              { type: 'person' }
            ]
          }
        ]
      }]
    },
    {
      name: 'date',
      type: 'dateObject',
      title: 'Date Created',
    },
    {
      name: 'dateEnd',
      type: 'dateObject',
      title: 'Latest Possible Date Created',
    },
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
