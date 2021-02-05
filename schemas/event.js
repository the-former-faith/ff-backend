import { FaRegCalendarAlt } from 'react-icons/fa'
import docMetadata from './docMetadata'

export default {
  name: 'event',
  title: 'Event',
  icon: FaRegCalendarAlt,
  type: 'document',
  fields: [
    ...docMetadata,
    {
      name: 'date',
      title: 'Date Began',
      type: 'dateObject',
      validation: Rule => Rule.required()
    },
    {
      name: 'dateEnd',
      title: 'Date Ended',
      type: 'dateObject'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: {type: 'location'}
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
      media: 'mainImage.image'
    }
  }
}