import { FaBook } from 'react-icons/fa'
import docMetadata from './docMetadata'

export default {
  name: 'book',
  title: 'Book',
  icon: FaBook,
  type: 'document',
  fields: [
    ...docMetadata,
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