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
      name: 'date',
      title: 'Date Published',
      type: 'dateObject',
      validation: Rule => Rule.required()
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