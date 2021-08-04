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