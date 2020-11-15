import { FaRegCalendarAlt } from 'react-icons/fa'

export default {
  name: 'event',
  title: 'Event',
  icon: FaRegCalendarAlt,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString'
    },
    {
      name: 'startTime',
      title: 'Start Time',
      type: 'dateObject'
    },
    {
      name: 'endTime',
      title: 'End Time',
      type: 'dateObject'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeAdvancedBlockContent'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'localeImage',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
  ],
  preview: {
    select: {
      title: 'title.en'
    }
  }
}