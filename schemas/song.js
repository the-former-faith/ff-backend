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
      name: 'linkHymnary',
      title: 'hymnary.org ULR',
      type: 'url',
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