import { FaItunesNote } from 'react-icons/fa'
import docMetadata from './docMetadata'

export default {
  name: 'song',
  title: 'Song',
  icon: FaItunesNote,
  type: 'document',
  fields: [
    ...docMetadata,
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            type: 'string',
            title: 'Site Title',
            options: {
              list: [
                {title: 'Hymnary.org', value: 'hymnary.org'},
              ]
            }
          },
          {
            name: 'url',
            type: 'url',
            title: 'URL',
          },
        ]
      }]
    },
    {
      name: 'tunes',
      title: 'Tunes',
      type: 'array',
      validation: Rule => Rule.unique().error('You can only link to the same song once'),
      of: [{type: 'reference', to: {type: 'song'}}],
    },
    {
      name: 'date',
      title: 'Date Published',
      type: 'dateObject',
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
      media: 'mainImage'
    },
  }
}