import { FaBook } from 'react-icons/fa'
import docMetadata from './docMetadata'

export default {
  name: 'book',
  title: 'Book',
  icon: FaBook,
  type: 'document',
  fields: [
    ...docMetadata,
    {
      name: 'date',
      title: 'Date Published',
      type: 'dateObject',
    },
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
                {title: 'Archive.org', value: 'archive.org'},
                {title: 'Publisher Official', value: 'publisher'},
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
      media: 'mainImage.file'
    },
  }
}